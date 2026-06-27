// In-memory mock data for development/demo purposes when DATABASE_URL is not available

interface MockAppointment {
  id: string
  token: string
  officeId: string
  serviceId: string
  citizenPhone: string
  citizenEmail?: string
  citizenName: string
  scheduledDate: string
  scheduledTime: string
  status: string
  queuePosition: number
  createdAt: string
}

let appointments: MockAppointment[] = []

export function addMockAppointment(appointment: MockAppointment) {
  appointments.push(appointment)
  return appointment
}

export function getMockAppointmentByToken(token: string): MockAppointment | undefined {
  return appointments.find((a) => a.token === token)
}

export function getAllMockAppointments(): MockAppointment[] {
  return appointments
}

export function clearMockData() {
  appointments = []
}

export function getMockAppointmentsForDate(
  officeId: string,
  date: string,
  status: string = 'pending'
): MockAppointment[] {
  return appointments.filter(
    (a) => a.officeId === officeId && a.scheduledDate === date && a.status === status
  )
}

export function getMockAppointmentById(id: string): MockAppointment | undefined {
  return appointments.find((a) => a.id === id)
}

export function updateMockAppointment(id: string, updates: Partial<MockAppointment>): MockAppointment | undefined {
  const index = appointments.findIndex((a) => a.id === id)
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...updates }
    return appointments[index]
  }
  return undefined
}
