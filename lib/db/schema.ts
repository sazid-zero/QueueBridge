import { pgTable, text, timestamp, boolean, integer, date, jsonb, serial } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- QueueBridge App Tables ------------------------------------------------

export const offices = pgTable('offices', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  phone: text('phone'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const services = pgTable('services', {
  id: text('id').primaryKey(),
  officeId: text('officeId').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  estimatedMinutes: integer('estimatedMinutes').notNull().default(15),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const timeSlots = pgTable('time_slots', {
  id: text('id').primaryKey(),
  serviceId: text('serviceId').notNull(),
  dayOfWeek: integer('dayOfWeek').notNull(),
  startTime: text('startTime').notNull(),
  endTime: text('endTime').notNull(),
  slotDurationMinutes: integer('slotDurationMinutes').notNull().default(30),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const appointments = pgTable('appointments', {
  id: text('id').primaryKey(),
  officeId: text('officeId').notNull(),
  serviceId: text('serviceId').notNull(),
  citizenPhone: text('citizenPhone').notNull(),
  citizenEmail: text('citizenEmail'),
  citizenName: text('citizenName'),
  token: text('token').notNull().unique(),
  scheduledDate: date('scheduledDate').notNull(),
  scheduledTime: text('scheduledTime').notNull(),
  status: text('status').notNull().default('pending'),
  queuePosition: integer('queuePosition'),
  arrivedAt: timestamp('arrivedAt'),
  completedAt: timestamp('completedAt'),
  waitTimeMinutes: integer('waitTimeMinutes'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const queueEvents = pgTable('queue_events', {
  id: text('id').primaryKey(),
  appointmentId: text('appointmentId').notNull(),
  eventType: text('eventType').notNull(),
  eventData: jsonb('eventData'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const analytics = pgTable('analytics', {
  id: text('id').primaryKey(),
  officeId: text('officeId').notNull(),
  date: date('date').notNull(),
  totalAppointments: integer('totalAppointments').notNull().default(0),
  completedAppointments: integer('completedAppointments').notNull().default(0),
  noShowAppointments: integer('noShowAppointments').notNull().default(0),
  totalWaitTimeMinutes: integer('totalWaitTimeMinutes').notNull().default(0),
  averageWaitTimeMinutes: integer('averageWaitTimeMinutes').notNull().default(0),
  peakHour: text('peakHour'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
