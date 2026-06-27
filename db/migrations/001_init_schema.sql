-- QueueBridge Database Schema
-- This migration file creates all necessary tables for the QueueBridge system
-- Compatible with PostgreSQL, Neon, and AWS RDS
-- Version: 1.0.0

-- ============================================================================
-- Better Auth Tables (required for authentication)
-- ============================================================================

CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "email" text UNIQUE NOT NULL,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "name" text,
  "image" text,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "token" text UNIQUE NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "account" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "expiresAt" timestamp,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id" text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- QueueBridge Domain Tables
-- ============================================================================

-- Offices: Represents physical office locations
CREATE TABLE IF NOT EXISTS "offices" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "location" text NOT NULL,
  "phone" text,
  "capacity" integer DEFAULT 50,
  "timezone" text DEFAULT 'UTC',
  "isActive" boolean DEFAULT true,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Services: Types of services offered at offices
CREATE TABLE IF NOT EXISTS "services" (
  "id" text PRIMARY KEY,
  "officeId" text NOT NULL REFERENCES "offices"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "description" text,
  "estimatedMinutes" integer DEFAULT 15,
  "isActive" boolean DEFAULT true,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Time Slots: Available booking times for services
CREATE TABLE IF NOT EXISTS "time_slots" (
  "id" text PRIMARY KEY,
  "serviceId" text NOT NULL REFERENCES "services"("id") ON DELETE CASCADE,
  "dayOfWeek" integer NOT NULL CHECK (dayOfWeek >= 0 AND dayOfWeek <= 6),
  "startTime" text NOT NULL,
  "endTime" text NOT NULL,
  "slotDurationMinutes" integer DEFAULT 30,
  "maxSlots" integer DEFAULT 10,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Appointments: Scheduled appointments with unique tokens
CREATE TABLE IF NOT EXISTS "appointments" (
  "id" text PRIMARY KEY,
  "officeId" text NOT NULL REFERENCES "offices"("id") ON DELETE CASCADE,
  "serviceId" text NOT NULL REFERENCES "services"("id") ON DELETE CASCADE,
  "citizenPhone" text NOT NULL,
  "citizenEmail" text,
  "citizenName" text,
  "token" text UNIQUE NOT NULL,
  "scheduledDate" date NOT NULL,
  "scheduledTime" text NOT NULL,
  "status" text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'arrived', 'serving', 'completed', 'no_show', 'cancelled')),
  "queuePosition" integer,
  "arrivedAt" timestamp,
  "servedAt" timestamp,
  "completedAt" timestamp,
  "waitTimeMinutes" integer,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Queue Events: Audit trail of queue state changes
CREATE TABLE IF NOT EXISTS "queue_events" (
  "id" text PRIMARY KEY,
  "appointmentId" text NOT NULL REFERENCES "appointments"("id") ON DELETE CASCADE,
  "officeId" text NOT NULL REFERENCES "offices"("id") ON DELETE CASCADE,
  "eventType" text NOT NULL CHECK (eventType IN ('created', 'position_updated', 'called', 'arrived', 'serving', 'completed', 'no_show', 'cancelled')),
  "eventData" jsonb DEFAULT '{}'::jsonb,
  "previousPosition" integer,
  "newPosition" integer,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Analytics: Daily aggregated metrics per office
CREATE TABLE IF NOT EXISTS "analytics" (
  "id" text PRIMARY KEY,
  "officeId" text NOT NULL REFERENCES "offices"("id") ON DELETE CASCADE,
  "date" date NOT NULL,
  "totalAppointments" integer DEFAULT 0,
  "completedAppointments" integer DEFAULT 0,
  "arrivedAppointments" integer DEFAULT 0,
  "noShowAppointments" integer DEFAULT 0,
  "totalWaitTimeMinutes" integer DEFAULT 0,
  "averageWaitTimeMinutes" float DEFAULT 0,
  "minWaitTimeMinutes" integer,
  "maxWaitTimeMinutes" integer,
  "peakHour" text,
  "averageServiceTimeMinutes" float DEFAULT 0,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("officeId", "date")
);

-- ============================================================================
-- Indexes for Performance Optimization
-- ============================================================================

-- User indexes
CREATE INDEX IF NOT EXISTS "idx_user_email" ON "user"("email");

-- Office indexes
CREATE INDEX IF NOT EXISTS "idx_offices_userId" ON "offices"("userId");
CREATE INDEX IF NOT EXISTS "idx_offices_isActive" ON "offices"("isActive");

-- Service indexes
CREATE INDEX IF NOT EXISTS "idx_services_officeId" ON "services"("officeId");
CREATE INDEX IF NOT EXISTS "idx_services_isActive" ON "services"("isActive");

-- Time slot indexes
CREATE INDEX IF NOT EXISTS "idx_time_slots_serviceId" ON "time_slots"("serviceId");
CREATE INDEX IF NOT EXISTS "idx_time_slots_dayOfWeek" ON "time_slots"("dayOfWeek");

-- Appointment indexes (critical for queue operations)
CREATE INDEX IF NOT EXISTS "idx_appointments_token" ON "appointments"("token");
CREATE INDEX IF NOT EXISTS "idx_appointments_officeId" ON "appointments"("officeId");
CREATE INDEX IF NOT EXISTS "idx_appointments_serviceId" ON "appointments"("serviceId");
CREATE INDEX IF NOT EXISTS "idx_appointments_scheduledDate" ON "appointments"("scheduledDate");
CREATE INDEX IF NOT EXISTS "idx_appointments_status" ON "appointments"("status");
CREATE INDEX IF NOT EXISTS "idx_appointments_officeId_scheduledDate_status" ON "appointments"("officeId", "scheduledDate", "status");

-- Queue event indexes
CREATE INDEX IF NOT EXISTS "idx_queue_events_appointmentId" ON "queue_events"("appointmentId");
CREATE INDEX IF NOT EXISTS "idx_queue_events_officeId" ON "queue_events"("officeId");
CREATE INDEX IF NOT EXISTS "idx_queue_events_eventType" ON "queue_events"("eventType");
CREATE INDEX IF NOT EXISTS "idx_queue_events_createdAt" ON "queue_events"("createdAt");

-- Analytics indexes
CREATE INDEX IF NOT EXISTS "idx_analytics_officeId" ON "analytics"("officeId");
CREATE INDEX IF NOT EXISTS "idx_analytics_date" ON "analytics"("date");
CREATE INDEX IF NOT EXISTS "idx_analytics_officeId_date" ON "analytics"("officeId", "date");

-- ============================================================================
-- Views for Common Queries
-- ============================================================================

-- Current queue state for an office
CREATE OR REPLACE VIEW "current_queue" AS
SELECT 
  a.id,
  a.token,
  a.queuePosition,
  a.status,
  a.citizenName,
  a.scheduledTime,
  a.createdAt,
  s.name as serviceName,
  CASE 
    WHEN a.status = 'serving' THEN 0
    WHEN a.status = 'arrived' THEN COALESCE(a.queuePosition, 999)
    ELSE 999
  END as displayPosition
FROM appointments a
JOIN services s ON a.serviceId = s.id
WHERE a.status IN ('arrived', 'serving')
ORDER BY a.queuePosition ASC NULLS LAST;

-- Daily queue metrics
CREATE OR REPLACE VIEW "daily_queue_metrics" AS
SELECT 
  a.officeId,
  DATE(a.scheduledDate) as date,
  COUNT(*) as totalAppointments,
  SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) as completedCount,
  SUM(CASE WHEN a.status = 'no_show' THEN 1 ELSE 0 END) as noShowCount,
  ROUND(AVG(CASE WHEN a.waitTimeMinutes IS NOT NULL THEN a.waitTimeMinutes ELSE NULL END), 2) as avgWaitTime,
  MAX(CASE WHEN a.waitTimeMinutes IS NOT NULL THEN a.waitTimeMinutes ELSE NULL END) as maxWaitTime
FROM appointments a
GROUP BY a.officeId, DATE(a.scheduledDate);

-- ============================================================================
-- Data Validation Triggers (Optional but Recommended for Data Integrity)
-- ============================================================================

-- Auto-update timestamp on appointment changes
CREATE OR REPLACE FUNCTION update_appointment_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS appointment_update_timestamp ON appointments;
CREATE TRIGGER appointment_update_timestamp
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_appointment_timestamp();

-- Auto-update timestamp on analytics changes
CREATE OR REPLACE FUNCTION update_analytics_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS analytics_update_timestamp ON analytics;
CREATE TRIGGER analytics_update_timestamp
BEFORE UPDATE ON analytics
FOR EACH ROW
EXECUTE FUNCTION update_analytics_timestamp();

-- ============================================================================
-- Sample Data (Optional - Remove for production)
-- ============================================================================

-- Uncomment the following to seed sample data for development

-- INSERT INTO "user" (id, email, "emailVerified", name) VALUES
-- ('user_1', 'admin@queuebridge.local', true, 'Admin User'),
-- ('user_2', 'manager@queuebridge.local', true, 'Office Manager');

-- INSERT INTO "offices" (id, "userId", name, location, phone, capacity) VALUES
-- ('office_1', 'user_1', 'Main Office', '123 Main St', '555-0001', 50),
-- ('office_2', 'user_1', 'Branch Office', '456 Branch Ave', '555-0002', 30);

-- INSERT INTO "services" (id, "officeId", name, description, "estimatedMinutes") VALUES
-- ('service_1', 'office_1', 'General Consultation', 'Standard office consultation', 20),
-- ('service_2', 'office_1', 'Document Processing', 'Process and file documents', 30),
-- ('service_3', 'office_2', 'Renewal Service', 'License and permit renewal', 25);

-- ============================================================================
-- Migration Metadata (for tracking)
-- ============================================================================

-- Create a migrations log table
CREATE TABLE IF NOT EXISTS "_migration_history" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "executedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "_migration_history" (name) VALUES ('001_init_schema') ON CONFLICT DO NOTHING;
