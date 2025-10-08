import { useState } from 'react'
import { createOrder } from '../services/api.service';
import type { Order } from '../models/order.model';

interface OrderFormProps {
  onRefresh: () => void;
}

export default function OrderForm(props: OrderFormProps) {
  const { onRefresh } = props;
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0.0);

  const handleProduct = (event: { target: { value: string } }) => {
    setProduct(event.target.value);
  };

  const handleQty = (event: { target: { value: string } }) => {
    setQty(parseInt(event.target.value));
  };

  const handlePrice = (event: { target: { value: string } }) => {
    setPrice(parseFloat(event.target.value));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await createOrder({ product, qty, price } as Order);
    onRefresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter product:
          <input type="text" value={product} onChange={handleProduct} />
        </label><br />
        <label>
          Enter quantity:
          <input type="text" value={qty} onChange={handleQty} />
        </label><br />
        <label>
          Enter price:
          <input type="text" value={price} onChange={handlePrice} />
        </label><br />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
