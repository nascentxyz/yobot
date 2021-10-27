import Web3 from "web3";

// ** Cancel a placed order **
// ** internally, removes any data stores and returns the user their funds **
const cancelOrder = async (
  web3: Web3,
  yobotERC721LimitOrder: any,
  tokenAddress: string,
  sender: string,
  txSubmitCallback: any,
  txFailCallback: any,
  txConfirmedCallback: any,
  userRejectedCallback: any
) => {
  // ** ERC721 Token Address must be valid **
  if (!tokenAddress) throw new Error("Invalid ERC721 Token address!");

  // ** Extract cancelOrder method from the YobotERC721LimitOrder Contract **
  let cancelOrderMethod =
    yobotERC721LimitOrder.methods.cancelOrder(tokenAddress);

  // ** Send Transaction **
  let txn = await cancelOrderMethod
    .send(tokenAddress, { from: sender }, (err, transactionHash) => {
      if (err) {
        userRejectedCallback();
      } else {
        txSubmitCallback();
      }
    })
    .on("receipt", () => {
      txConfirmedCallback("⚔️ Placed Order ⚔️");
    });

  // ** Just return the txn object **
  return txn;
};

export default cancelOrder;
