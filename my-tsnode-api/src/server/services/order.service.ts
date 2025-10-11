
import { PrismaClient } from "../../generated/prisma/client";
import { Order } from "../models/order.model";
import { ParamFilter } from "../models/param.model";
import { Summary } from "../models/summary.model";

const prisma = new PrismaClient();

async function getOrder(id: number): Promise<Order | null> {
  try {
    const result = await prisma.orders.findFirst({ where: { id: id } });
    return result;
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
  return {} as Order;
}

async function getOrders(filter?: ParamFilter): Promise<Order[]> {
  try {
    const limit = 100;
    const query = { take: limit, skip: 0 };    

    if (filter) {
      if (filter.offset >= 0 && !(filter.limit > limit)) {
        (query as any).take = filter.limit;
        (query as any).skip = filter.offset;
      }
      if (filter.product) {
        (query as any).where = { product: filter.product };
      }
    }

    const result = await prisma.orders.findMany(query);
    return result;
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
  return [];
}

async function createOrder(order: Order): Promise<Order> {
  try {
    const result = await prisma.orders.create({ data: order })
    return result;
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
  return {} as Order;
}

function summarizeOrders(orders: Order[]): Summary {
  const totalRevenue = orders.reduce((sum, order) => sum + order.price * order.qty, 0);
  const prices = orders.map(order => order.price).sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);
  const medianOrderPrice = prices.length % 2 !== 0 ? prices[mid] : (prices[mid - 1] + prices[mid]) / 2;
  const uniqueOrders = orders.reduce((list, val) => {
    const index = list.findIndex(x => x.product === val.product);
    if (index > -1) {
      list[index].qty += val.qty;
    } else {
      list.push({ ...val });
    }
    return list;
  }, [] as Order[]);
  const topProductByQty = uniqueOrders.reduce((obj, val) => {
    if (!obj.product || obj.qty < val.qty) {
      obj = { ...val };
    }
    return obj;
  }, {} as Order);
  const uniqueProductCount = uniqueOrders.length;
  
  return {
    totalRevenue: totalRevenue ? totalRevenue : 0,
    medianOrderPrice: medianOrderPrice ? medianOrderPrice : 0,
    topProductByQty: topProductByQty.product || '',
    uniqueProductCount: uniqueProductCount ? uniqueProductCount : 0,
  };
}

export { summarizeOrders, getOrders, createOrder, getOrder };