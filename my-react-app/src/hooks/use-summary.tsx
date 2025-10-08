import { useCallback, useEffect, useState } from 'react';
import type { Summary } from '../models/summary.model';
import { getOrders, getSummary } from '../services/api.service';
import type { Order } from '../models/order.model';

export default function useSummary() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const requestSummary = useCallback(async () => {
    const data = await getSummary();
    setSummary(data);
  }, []);

  const requestOrders = useCallback(async () => {
    const data = await getOrders();
    setOrders(data);
  }, []);

  const refresh = useCallback(async () => {
    requestSummary();
    requestOrders();
  }, [requestOrders, requestSummary]);
  
  useEffect(() => {
    refresh();
  }, [refresh]);
  
  return { summary, orders, requestSummary, requestOrders, refresh };
}
