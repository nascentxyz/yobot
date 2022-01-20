import Web3 from "web3";

// ** Cancel a placed order **
// ** internally, removes any data stores and returns the user their funds **
const cancelOrder = async (
  web3: Web3,
  yobotERC721LimitOrder: any,
  orderNum: number,
  sender: string,
  txSubmitCallback: any,
  txFailCallback: any,
  txConfirmedCallback: any,
  userRejectedCallback: any
) => {
  // NOTE: Order Number can be 0 //

  // ** Extract cancelOrder method from the YobotERC721LimitOrder Contract **
  let cancelOrderMethod = yobotERC721LimitOrder.methods.cancelOrder(orderNum);

  // ** Send Transaction **
  let txn = await cancelOrderMethod
    .send(orderNum, { from: sender }, (err, transactionHash) => {
      if (err) {
        userRejectedCallback();
      } else {
        txSubmitCallback();
      }
    })
    .on("receipt", () => {
      txConfirmedCallback("⚔️ Cancelled Order ⚔️");
    });

  // ** Just return the txn object **
  return txn;
};

export default cancelOrder;
