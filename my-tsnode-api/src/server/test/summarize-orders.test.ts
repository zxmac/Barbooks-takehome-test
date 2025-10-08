import { Order } from "../models/order.model";
import { summarizeOrders } from "../services/order.service";

describe('summarizeOrders', () => {
  it('should correctly summarize a typical list of orders', () => {
    const orders: Order[] = [
      { id: 1, product: 'Apple', qty: 10, price: 2 },
      { id: 2, product: 'Banana', qty: 5, price: 1 },
      { id: 3, product: 'Apple', qty: 3, price: 2 },
      { id: 4, product: 'Cherry', qty: 7, price: 3 },
    ];

    const summary = summarizeOrders(orders);

    expect(summary.totalRevenue).toBe(10*2 + 5*1 + 3*2 + 7*3); // 20 + 5 + 6 + 21 = 52
    expect(summary.medianOrderPrice).toBe(2); // prices = [1,2,2,3] → median = 2
    expect(summary.topProductByQty).toBe('Apple'); // Apple = 13 qty, Banana = 5, Cherry = 7
    expect(summary.uniqueProductCount).toBe(3);
  });

  it('should handle an empty order list', () => {
    const summary = summarizeOrders([]);
    expect(summary.totalRevenue).toBe(0);
    expect(summary.medianOrderPrice).toBe(0);
    expect(summary.topProductByQty).toBe('');
    expect(summary.uniqueProductCount).toBe(0);
  });

  it('should handle a single order', () => {
    const orders: Order[] = [{ id: 1, product: 'Mango', qty: 4, price: 5 }];
    const summary = summarizeOrders(orders);

    expect(summary.totalRevenue).toBe(20);
    expect(summary.medianOrderPrice).toBe(5);
    expect(summary.topProductByQty).toBe('Mango');
    expect(summary.uniqueProductCount).toBe(1);
  });

  it('should handle multiple products with same total quantity', () => {
    const orders: Order[] = [
      { id: 1, product: 'X', qty: 5, price: 10 },
      { id: 2, product: 'Y', qty: 5, price: 15 },
    ];

    const summary = summarizeOrders(orders);
    expect(summary.totalRevenue).toBe(5*10 + 5*15); // 125
    expect(summary.medianOrderPrice).toBe(12.5); // [10,15]
    expect(['X', 'Y']).toContain(summary.topProductByQty); // either is acceptable
    expect(summary.uniqueProductCount).toBe(2);
  });
});
