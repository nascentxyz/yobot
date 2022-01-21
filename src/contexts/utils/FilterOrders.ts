
// ** Filters user's open orders for valid orders ** //
const filterOrders = (orders: any[]) => {
  console.log("Filtering orders: ", orders);
  return orders.filter(order => order.quantity !== 0);
};

export default filterOrders;