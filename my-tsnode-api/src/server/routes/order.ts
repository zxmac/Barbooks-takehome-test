import { Router } from 'express';
import { createOrder, getOrders } from '../services/order.service';
export const router = Router();

router.get('/', async (req: any, res: any) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : -1;
  const offset = req.query.offset ? parseInt(req.query.offset) : -1;
  const product = req.query.product ? req.query.product : null;

  const data = await getOrders({
    limit: limit,
    offset: offset,
    product: product
  });

  res.json(data);
});

router.post('/', async (req, res, next) => {
    try {
      const order = await createOrder(req.body);
      res.status(201).json(order);
    } catch (e) { next(e); }
  }
);