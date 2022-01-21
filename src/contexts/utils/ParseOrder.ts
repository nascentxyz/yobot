const parseOrders = (orders) => orders.map((o) => parseOrder(o));

const parseOrder = (order) => {
  return {
    owner: order["0"],
    tokenAddress: order["1"],
    priceInWeiEach: order["2"],
    quantity: order["3"],
    num: order["4"],
  };
};

export { parseOrder, parseOrders };
