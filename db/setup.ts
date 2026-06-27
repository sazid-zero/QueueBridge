/**
 * QueueBridge Database Setup Script
 * 
 * This script initializes the database with all required tables and indexes.
 * 
 * Usage:
 *   npx ts-node db/setup.ts
 * 
 * Environment variables required:
 *   - DATABASE_URL: PostgreSQL connection string
 */

import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL environment variable is not set')
  process.exit(1)
}

const pool = new Pool({
  connectionString: DATABASE_URL,
})

async function runMigration() {
  const client = await pool.connect()

  try {
    console.log('🚀 Starting QueueBridge database setup...')

    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'migrations', '001_init_schema.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8')

    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'))

    let executedCount = 0

    for (const statement of statements) {
      try {
        await client.query(statement)
        executedCount++
        console.log(`✓ Executed statement ${executedCount}`)
      } catch (err) {
        // Some statements might fail if objects already exist (e.g., CREATE IF NOT EXISTS)
        // This is expected and not a critical error
        if (err instanceof Error && err.message.includes('already exists')) {
          console.log(`⚠ Skipped (already exists): ${statement.substring(0, 50)}...`)
        } else {
          throw err
        }
      }
    }

    console.log('\n✅ Database setup completed successfully!')
    console.log(`📊 Executed ${executedCount} migration statements`)

    // Verify tables were created
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)

    console.log('\n📋 Created tables:')
    tables.rows.forEach((row) => {
      console.log(`  - ${row.table_name}`)
    })
  } catch (err) {
    console.error('❌ Database setup failed:', err)
    process.exit(1)
  } finally {
    await client.end()
    await pool.end()
  }
}

// Run the migration
runMigration().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
