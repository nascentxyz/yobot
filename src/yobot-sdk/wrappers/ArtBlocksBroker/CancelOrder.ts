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
  // ** ArtBlocks Project Id must be greater than 0 **
  if (!artBlocksProjectId || artBlocksProjectId <= 0)
    throw new Error("ArtBlocks Project Id must be greater than 0!");

  // ** Extract cancelOrder method from the YobotArtBlocksBroker Contract **
  let cancelOrderMethod =
    yobotArtBlocksBroker.methods.cancelOrder(artBlocksProjectId);

  // ** Send Transaction **
  let txn = await cancelOrderMethod
    .send(artBlocksProjectId, { from: sender }, (err, transactionHash) => {
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
