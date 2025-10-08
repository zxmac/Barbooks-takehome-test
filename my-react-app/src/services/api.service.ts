import type { Order } from "../models/order.model";
import type { Summary } from "../models/summary.model";
import { myFetch } from "../utils/my-fetch";

export async function getOrders() {
  const data = await myFetch<Order[]>(`${import.meta.env.VITE_API_URL}orders`);
  return data;
}

export async function createOrder(order: Order) {
  const data = await myFetch<Order>(`${import.meta.env.VITE_API_URL}orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  return data;
}

export async function getSummary() {
  const data = await myFetch<Summary>(`${import.meta.env.VITE_API_URL}summary`);
  return data;
}