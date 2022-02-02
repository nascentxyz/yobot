import Web3 from "web3";

// ** View a user's open orders ** //
const viewUserOrders = async (
  web3: Web3,
  yobotERC721LimitOrder: any,
  user: string
) => {
  // console.log("Viewing user's open orders...");
  // console.log("yobotERC721LimitOrder: ", yobotERC721LimitOrder);
  // console.log("yobotERC721LimitOrder address: ", yobotERC721LimitOrder.options.address);
  if (yobotERC721LimitOrder && yobotERC721LimitOrder.options.address) {
    let viewUserOrdersMethod =
      await yobotERC721LimitOrder.methods.viewUserOrders(user);
    // console.log("viewUserOrdersMethod", viewUserOrdersMethod);
    let openOrders = await viewUserOrdersMethod.call();
    // console.log("openOrders", openOrders);
    return openOrders;
  }

  // ** Otherwise, empty result ** //
  return [];
};

export default viewUserOrders;
