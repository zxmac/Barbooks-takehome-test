import { Order } from "../models/order.model";
import { Summary } from "../models/summary.model";

function summarizeOrders(orders: Order[]): Summary {
  const totalRevenue = orders.reduce((sum, order) => sum + order.price * order.qty, 0);
  const prices = orders.map(order => order.price).sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);
  const medianOrderPrice = prices.length % 2 !== 0 ? prices[mid] : (prices[mid - 1] + prices[mid]) / 2;
  const topProductByQty = orders.reduce((obj, val) => {
    if (!obj.qty) {
      obj = { ...val };      
    } else if (obj.product === val.product) {
      obj.qty += val.qty;
    } else if (obj.qty < val.qty) {
      obj = { ...val };
    }
    return obj;
  }, {} as Order);
  const uniqueProductCount = orders.reduce((obj: Order[], val: Order) => {
    if (!obj.find((o: Order) => o.product === val.product)) {
      obj.push(val);
    }
    return obj;
  }, []).length;
  
  return {
    totalRevenue: totalRevenue ? totalRevenue : 0,
    medianOrderPrice: medianOrderPrice ? medianOrderPrice : 0,
    topProductByQty: topProductByQty.product || '',
    uniqueProductCount: uniqueProductCount ? uniqueProductCount : 0,
  };
}

export { summarizeOrders };