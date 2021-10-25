import Web3 from "web3";

// ** Cancel a placed order **
// ** internally, removes any data stores and returns the user their funds **
const cancelOrder = async (
  web3: Web3,
  yobotArtBlocksBroker: any,
  artBlocksProjectId: number,
  sender: string,
  txSubmitCallback: any,
  txFailCallback: any,
  txConfirmedCallback: any,
  userRejectedCallback: any
) => {
  console.log("In cancelOrder function...");

  // ** ArtBlocks Project Id must be greater than 0 **
  if (!artBlocksProjectId || artBlocksProjectId <= 0)
    throw new Error("ArtBlocks Project Id must be greater than 0!");

  // ** Extract cancelOrder method from the YobotArtBlocksBroker Contract **
  let cancelOrderMethod = yobotArtBlocksBroker.methods.cancelOrder();
  console.log("Sending cancel ArtBlocksBid to method:", cancelOrderMethod);

  // ** Send Transaction **
  let txn = await cancelOrderMethod
    .send(artBlocksProjectId, { from: sender }, (err, transactionHash) => {
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