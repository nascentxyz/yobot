// ** Filters user's open orders for valid orders ** //
const filterOrders = (orders: any[]) => {
  const order_res = orders.filter((order) => order.quantity !== 0 && order.quantity !== "0");
  return order_res;
};

export default filterOrders;
