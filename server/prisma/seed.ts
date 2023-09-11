import { bands, concerts, salaries, tourManagers } from './seedData'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  for (const tourManager of tourManagers) {
    await prisma.tourManager.create({ data: tourManager })
  }
  for (const band of bands) {
    await prisma.band.create({ data: band })
  }
  for (const concert of concerts) {
    await prisma.concert.create({ data: concert })
  }
  for (const salary of salaries) {
    await prisma.salary.create({ data: salary })
  }
}

try {
  main()
} catch (e) {
  console.error(e)
  process.exit(1)
} finally {
  prisma.$disconnect()
}
