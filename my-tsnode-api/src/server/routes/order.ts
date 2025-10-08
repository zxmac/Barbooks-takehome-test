import { Router } from 'express';
import { createOrder, getOrder, getOrders } from '../services/order.service';
export const router = Router();

router.get('/', async (req: any, res: any) => {
  const data = await getOrders();
  res.json(data);
});

router.get('/:id', async (req: any, res: any) => {
  const data = await getOrder(parseInt(req.params.id));
  res.json(data);
});

router.post('/', async (req, res, next) => {
    try {
      const order = await createOrder(req.body);
      res.status(201).json(order);
    } catch (e) { next(e); }
  }
);