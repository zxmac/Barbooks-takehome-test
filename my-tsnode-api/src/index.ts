import { createServer } from 'http';
import app from "./server/app";
import { PrismaClient } from "./generated/prisma/client"
import { env } from './server/utils/env';
const server = createServer(app);

const PORT = env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`API listening on port ${PORT} (env: ${env.NODE_ENV})`);
});

['SIGINT', 'SIGTERM', 'uncaughtException', 'unhandledRejection'].forEach((sig) => {
  process.on(sig, (err) => {
    if (err) console.log(err);
    console.log(`Shutting down due to ${sig}`);
    server.close(() => process.exit(0));
    // Fallback shutdown in 3s
    setTimeout(() => process.exit(1), 3000).unref();
  });
});

const prisma = new PrismaClient()

async function main() {
  await prisma.orders.deleteMany()

  const orders = await prisma.orders.createMany({
    data: [
      { id: 1, product: 'Apple', qty: 10, price: 2 },
      { id: 2, product: 'Banana', qty: 5, price: 1 },
      { id: 3, product: 'Apple', qty: 3, price: 2 },
      { id: 4, product: 'Cherry', qty: 7, price: 3 },
      { id: 5, product: 'Grapes', qty: 8, price: 3 }
    ],
  })

  console.log('Orders created:', orders)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
