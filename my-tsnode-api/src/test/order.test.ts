import { seed } from "../seed";
import app from "../server/app";
import request from 'supertest';

beforeAll(async () => {
  await seed();
});

describe('GET /api/orders', () => {
  it('should return a list of orders', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toEqual(200);
    
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /api/orders', () => {
  it('should create a new order and return status 201', async () => {
    const newOrder = { product: 'Graprs', qty: 10, price: 1010 };
    const res = await request(app)
      .post('/api/orders')
      .send(newOrder)
      .expect(201); // Assert HTTP status code

    expect(res.body).toHaveProperty('id');
    expect(res.body.product).toBe(newOrder.product);
    expect(res.body.qty).toBe(newOrder.qty);
    expect(res.body.price).toBe(newOrder.price);
  });
});
