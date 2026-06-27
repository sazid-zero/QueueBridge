# AWS Migration Guide for QueueBridge

This guide provides step-by-step instructions for migrating the QueueBridge database from Neon to AWS RDS (Aurora PostgreSQL or Aurora DSQL).

## Prerequisites

- AWS Account with RDS access
- AWS CLI configured with credentials
- PostgreSQL client tools installed (`psql`)
- Current Neon database with all data
- Environment variables properly configured

## Option 1: AWS RDS Aurora PostgreSQL (Recommended)

### Step 1: Create Aurora PostgreSQL Database

```bash
# Using AWS CLI
aws rds create-db-cluster \
  --db-cluster-identifier queuebridge-prod \
  --engine aurora-postgresql \
  --engine-version 15.3 \
  --master-username postgres \
  --master-user-password <STRONG_PASSWORD> \
  --database-name queuebridge \
  --backup-retention-period 30 \
  --preferred-backup-window "03:00-04:00" \
  --preferred-maintenance-window "sun:04:00-sun:05:00" \
  --enable-cloudwatch-logs-exports '["postgresql"]'

# Create the primary instance
aws rds create-db-instance \
  --db-instance-identifier queuebridge-primary \
  --db-cluster-identifier queuebridge-prod \
  --db-instance-class db.t4g.medium \
  --engine aurora-postgresql
```

### Step 2: Configure Security Groups

```bash
# Get the DB security group ID
DB_SG_ID=$(aws rds describe-db-clusters \
  --db-cluster-identifier queuebridge-prod \
  --query 'DBClusters[0].VpcSecurityGroups[0].VpcSecurityGroupId' \
  --output text)

# Allow inbound PostgreSQL from your IP
aws ec2 authorize-security-group-ingress \
  --group-id $DB_SG_ID \
  --protocol tcp \
  --port 5432 \
  --cidr 0.0.0.0/0  # In production, restrict this to your VPC/IP
```

### Step 3: Export Data from Neon

```bash
# Dump the entire database schema and data
pg_dump $NEON_DATABASE_URL \
  --no-password \
  --verbose \
  --format=custom \
  --file=queuebridge_dump.sql

# Alternative: Export as plain SQL
pg_dump $NEON_DATABASE_URL \
  --no-password \
  --verbose \
  > queuebridge_dump.sql
```

### Step 4: Import Data to AWS RDS

```bash
# Get the AWS RDS endpoint
RDS_ENDPOINT=$(aws rds describe-db-clusters \
  --db-cluster-identifier queuebridge-prod \
  --query 'DBClusters[0].Endpoint' \
  --output text)

# Restore from backup file
pg_restore \
  --host=$RDS_ENDPOINT \
  --port=5432 \
  --username=postgres \
  --dbname=queuebridge \
  --no-password \
  queuebridge_dump.sql

# Or if using plain SQL
psql \
  --host=$RDS_ENDPOINT \
  --port=5432 \
  --username=postgres \
  --dbname=queuebridge \
  < queuebridge_dump.sql
```

### Step 5: Verify Data Migration

```sql
-- Connect to the new RDS database
psql -h $RDS_ENDPOINT -U postgres -d queuebridge

-- Run verification queries
SELECT COUNT(*) as users FROM "user";
SELECT COUNT(*) as offices FROM offices;
SELECT COUNT(*) as appointments FROM appointments;
SELECT COUNT(*) as analytics FROM analytics;

-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Step 6: Update Application Environment Variables

```bash
# Update .env.local with new RDS endpoint
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@queuebridge-prod.cluster-xxxxx.us-east-1.rds.amazonaws.com:5432/queuebridge"

# Verify connection
psql $DATABASE_URL -c "SELECT version();"
```

## Option 2: AWS Aurora DSQL

Aurora DSQL is a newer, fully managed PostgreSQL-compatible database service.

### Step 1: Create Aurora DSQL Cluster

```bash
aws dsql create-cluster \
  --cluster-name queuebridge-dsql \
  --region us-east-1
```

### Step 2: Authorize Database Connection

```bash
aws dsql authorize-cluster \
  --cluster-arn arn:aws:dsql:region:account:cluster/queuebridge-dsql \
  --principal arn:aws:iam::ACCOUNT_ID:user/YOUR_USER
```

### Step 3-6: Follow the same steps as Aurora PostgreSQL

The connection string format for DSQL is slightly different but the migration process is identical.

## Database Optimization for AWS

### Create Read Replicas

```bash
aws rds create-db-instance \
  --db-instance-identifier queuebridge-read-replica \
  --db-instance-class db.t4g.medium \
  --engine aurora-postgresql \
  --availability-zone us-east-1b \
  --source-db-cluster-identifier queuebridge-prod
```

### Enable Performance Insights

```bash
aws rds modify-db-instance \
  --db-instance-identifier queuebridge-primary \
  --enable-performance-insights \
  --performance-insights-retention-period 7
```

### Enable Enhanced Monitoring

```bash
aws rds modify-db-instance \
  --db-instance-identifier queuebridge-primary \
  --monitoring-interval 60 \
  --monitoring-role-arn arn:aws:iam::ACCOUNT_ID:role/rds-monitoring-role
```

## Monitoring and Maintenance

### CloudWatch Metrics to Monitor

- **DatabaseConnections**: Number of active connections
- **CPUUtilization**: CPU usage percentage
- **DatabaseLoad**: Active sessions
- **EngineUptime**: How long the instance has been running
- **FreeableMemory**: Available memory
- **VolumeBytesUsed**: Storage used
- **WriteLatency**: Write performance

### Create CloudWatch Alarms

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name queuebridge-high-cpu \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/RDS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:ACCOUNT_ID:YOUR_SNS_TOPIC
```

## Backup and Recovery

### Automated Backups

Aurora automatically backs up your database:
- Retention period: 30 days (configured in Step 1)
- Backups are stored in S3
- Can be restored to any point in time (point-in-time recovery)

### Manual Snapshots

```bash
aws rds create-db-cluster-snapshot \
  --db-cluster-snapshot-identifier queuebridge-snapshot-$(date +%Y%m%d) \
  --db-cluster-identifier queuebridge-prod

# List snapshots
aws rds describe-db-cluster-snapshots \
  --db-cluster-identifier queuebridge-prod

# Restore from snapshot
aws rds restore-db-cluster-from-snapshot \
  --db-cluster-identifier queuebridge-restored \
  --snapshot-identifier queuebridge-snapshot-20240101 \
  --engine aurora-postgresql
```

## Performance Tuning for Production

### PostgreSQL Configuration Parameters

```sql
-- Connect to the database
ALTER SYSTEM SET shared_buffers = '12GB';
ALTER SYSTEM SET effective_cache_size = '36GB';
ALTER SYSTEM SET work_mem = '30MB';
ALTER SYSTEM SET maintenance_work_mem = '3GB';
ALTER SYSTEM SET random_page_cost = 1.1;

-- Restart the database cluster for changes to take effect
SELECT pg_reload_conf();
```

### Query Optimization

```sql
-- Analyze slow queries
SELECT query, calls, mean_exec_time, max_exec_time 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;

-- Update statistics
ANALYZE;

-- Create missing indexes
SELECT schemaname, tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public';
```

## Rollback Plan

If migration fails or you need to rollback:

```bash
# 1. Update environment variables back to Neon
DATABASE_URL="postgresql://USER:PASSWORD@YOUR_NEON_HOST/queuebridge"

# 2. Verify Neon database is still accessible
psql $DATABASE_URL -c "SELECT version();"

# 3. Terminate AWS RDS cluster if needed
aws rds delete-db-cluster \
  --db-cluster-identifier queuebridge-prod \
  --skip-final-snapshot
```

## Cost Optimization

### Right-sizing Instances

- Start with **db.t4g.medium** for development/staging
- Use **db.r6g.xlarge** for production (memory-optimized)
- Adjust based on monitoring data after 2 weeks

### Reserved Instances

```bash
# Purchase 1-year reserved instance (save ~30%)
aws ec2 purchase-reserved-instances \
  --reserved-instances-offering-ids 'OFFERING_ID' \
  --instance-count 1
```

### Aurora Auto Scaling

```bash
aws application-autoscaling register-scalable-target \
  --service-namespace rds \
  --resource-id cluster:queuebridge-prod \
  --scalable-dimension rds:cluster:DesiredReadReplicaCount \
  --min-capacity 1 \
  --max-capacity 3

aws application-autoscaling put-scaling-policy \
  --policy-name cpu-scaling \
  --service-namespace rds \
  --resource-id cluster:queuebridge-prod \
  --scalable-dimension rds:cluster:DesiredReadReplicaCount \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration file://scaling-policy.json
```

## Support and Resources

- AWS RDS Documentation: https://docs.aws.amazon.com/rds/
- Aurora PostgreSQL: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraPG.html
- Aurora DSQL: https://docs.aws.amazon.com/aurora-dsql/
- PostgreSQL Performance: https://www.postgresql.org/docs/current/performance-tips.html
