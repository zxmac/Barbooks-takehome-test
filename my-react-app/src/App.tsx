import './App.css'
import useSummary from './hooks/use-summary'
import OrderForm from './components/order-form';

function App() {
  const { summary, orders, refresh } = useSummary()

  const onRefresh = () => {
    refresh();
  };

  return (
    <>
      <h2>Summary</h2>
      <div>Total Revenue: {summary?.totalRevenue}</div>
      <div>Median Order Price: {summary?.medianOrderPrice}</div>
      <div>Top Product By Qty: {summary?.topProductByQty}</div>

      <h3>Orders</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.product}</td>
                <td>{order.qty}</td>
                <td>{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div>
        <h2>Place a new order</h2>
        <OrderForm onRefresh={onRefresh} />
      </div>
    </>
  )
}

export default App
