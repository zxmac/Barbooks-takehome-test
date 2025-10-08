import { Router } from 'express';
import { getOrders, summarizeOrders } from '../services/order.service';
export const router = Router();

router.get('/', async (req: any, res: any) => {
  const data = await getOrders();
  res.json(summarizeOrders(data));
});