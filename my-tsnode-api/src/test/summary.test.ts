import { seed } from "../seed";
import app from "../server/app";
import request from "supertest";

beforeAll(async () => {
  await seed();
});

describe('GET /api/summary', () => {
  it('should return a summary', async () => {
    const res = await request(app).get('/api/summary');
    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('totalRevenue');
    expect(res.body).toHaveProperty('medianOrderPrice');
    expect(res.body).toHaveProperty('topProductByQty');
    expect(res.body).toHaveProperty('uniqueProductCount');
    
    expect(typeof res.body.totalRevenue).toBe('number');
    expect(typeof res.body.medianOrderPrice).toBe('number');
    expect(typeof res.body.topProductByQty).toBe('string');
    expect(typeof res.body.uniqueProductCount).toBe('number');

    expect(res.body.totalRevenue).toBe(10*2 + 5*1 + 3*2 + 7*3); // 20 + 5 + 6 + 21 = 52
    expect(res.body.medianOrderPrice).toBe(2); // prices = [1,2,2,3] → median = 2
    expect(res.body.topProductByQty).toBe('Apple'); // Apple = 13 qty, Banana = 5, Cherry = 7
    expect(res.body.uniqueProductCount).toBe(3);
  });
});