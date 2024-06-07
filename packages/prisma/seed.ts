import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

function getDate(days: number) {
  const day = new Date()

  day.setDate(day.getDate() + days)

  return new Date(day.toISOString().replace(/T.*$/, '').concat('T00:00:00'))
}

async function seed() {
  await Promise.all(
    [
      'users',
      'clinics',
      'schedules',
      'schedule_days',
      'clients',
      'schedule_types',
      'schedule_itens',
    ].map(
      async (name) =>
        await prisma.$queryRawUnsafe(
          `Truncate "${name}" restart identity cascade;`,
        ),
    ),
  )

  const hashedPassword = await hash('GC@Andre4321', 10)

  const user = await prisma.user.create({
    data: {
      id: '8fe74579-01c3-4c98-bd24-9e86aebe507b',
      name: 'André Ghisleni Raimann',
      email: 'andre@andreg.com.br',
      image: 'https://github.com/andreghisleni.png',
      passwordHash: hashedPassword,
    },
  })

  const clinic = await prisma.clinic.create({
    data: {
      id: 'c5cf5e02-31f6-4246-bef3-1c9a660190db',
      name: 'Clinica Teste',
      description: 'Teste',
      users: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  const schedule = await prisma.schedule.create({
    data: {
      id: '5c596255-1bb5-43af-85ee-bd3bddb176d7',
      name: 'Agenda',
      description: 'Teste',
      startTime: '08:00',
      endTime: '18:00',
      clinicId: clinic.id,
    },
  })

  console.log(getDate(3))

  await prisma.scheduleDay.create({
    data: {
      day: getDate(3),
      times: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
      scheduleId: schedule.id,
    },
  })
  await prisma.scheduleDay.create({
    data: {
      day: getDate(4),
      times: [
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
      ],
      scheduleId: schedule.id,
    },
  })

  await prisma.scheduleDay.create({
    data: {
      day: getDate(5),
      times: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
      scheduleId: schedule.id,
    },
  })

  const client = await prisma.client.create({
    data: {
      clinicId: clinic.id,
      id: '70c5bf99-b59a-437e-a02d-7abe5174e694',
      name: 'André Ghisleni Raimann',
      email: 'andre@andreg.com.br',
      phone: '49999383783',
      birthDate: new Date('2003-04-23'),
      cityOfBirth: 'Chapecó',
      cep: '89802-195',
      firstConsultation: new Date(),
      city: 'Chapecó',
      state: 'SC',
      neighborhood: 'Saic',
      street: 'Rua Coronel Manoel dos Passos Maia',
      number: '405',
      complement: 'E',
      civilStatus: 'Solteiro',
    },
  })

  const scheduleType = await prisma.scheduleType.create({
    data: {
      clinicId: clinic.id,
      id: 'b0249d45-ecf0-47c6-a65a-387bcad03ab3',
      name: 'Consulta',
      description: 'Consulta',
      time: 60,
      price: 100,
    },
  })

  await prisma.scheduleItem.create({
    data: {
      id: '650462d9-5f4b-45c6-a3a2-c5d9ffe8407d',
      clientId: client.id,
      scheduleId: schedule.id,
      scheduleTypeId: scheduleType.id,
      status: 'PENDING',
      startAt: new Date(
        `${getDate(3).toISOString().replace(/T.*$/, '')}T08:00:00`,
      ),
      endAt: new Date(
        `${getDate(3).toISOString().replace(/T.*$/, '')}T09:00:00`,
      ),
    },
  })
}

seed().then(() => {
  console.log('Seed finished')
})
