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
  console.log("In cancelOrder function...");

  // ** ERC721 Token Address must be valid **
  if (!tokenAddress)
    throw new Error("Invalid ERC721 Token address!");

  // ** Extract cancelOrder method from the YobotERC721LimitOrder Contract **
  let cancelOrderMethod = yobotERC721LimitOrder.methods.cancelOrder();
  console.log("Sending cancel ArtBlocksBid to method:", cancelOrderMethod);

  // ** Send Transaction **
  let txn = await cancelOrderMethod
    .send(tokenAddress, { from: sender }, (err, transactionHash) => {
      if (err) {
        console.log("TRANSACTION_FAILED:", err);
        userRejectedCallback();
      } else {
        console.log("TRANSACTION_SUBMITTED:", transactionHash);
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