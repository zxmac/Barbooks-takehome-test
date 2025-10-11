import { PrismaClient } from "./generated/prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.orders.deleteMany()

  const orders = await prisma.orders.createMany({
    data: [
      { id: 1, product: 'Apple', qty: 10, price: 2 },
      { id: 2, product: 'Banana', qty: 5, price: 1 },
      { id: 3, product: 'Apple', qty: 3, price: 2 },
      { id: 4, product: 'Cherry', qty: 7, price: 3 },
    ]
  })

  console.log('Orders created:', orders)
}

export async function seed() {
  try {
    await main();
  } catch (e) {
    console.error('Seed error:', e)
  } finally {
    await prisma.$disconnect()
  }
}
