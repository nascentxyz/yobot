import Web3 from "web3";

// ** Fill an ERC721 Limit Order ** //
const fillOrder = async (
  web3: Web3,
  yobotERC721LimitOrder: any,
  orderId: number,
  tokenId: number,
  expectedPriceInWeiEach: number,
  profitTo: string,
  sendNow: boolean,
  sender: string,
  txSubmitCallback: any,
  txFailCallback: any,
  txConfirmedCallback: any,
  userRejectedCallback: any
) => {
  // ** Order ID must be greater than 0 **
  if (!orderId || orderId <= 0)
    throw new Error("Order ID must be greater than 0!");

  // ** Token ID must be greater than or equal to 0 **
  if (!tokenId || tokenId <= 0)
    throw new Error("Token ID must be greater than or equal to 0!");

  // ** Expected Price in Wei must be greater than or equal to 0 **
  if (!expectedPriceInWeiEach || expectedPriceInWeiEach <= 0)
    throw new Error("Expected Price in Wei must be greater than or equal to 0!");

  // ** If the profitTo string isn't an address, error **
  if (!web3.utils.isAddress(profitTo)) throw new Error("Invalid address to send profit to!");

  // ** Extract fillOrder method from the YobotERC721LimitOrder Contract **
  let fillOrderMethod = yobotERC721LimitOrder.methods.fillOrder(
    orderId,
    tokenId,
    expectedPriceInWeiEach,
    profitTo,
    sendNow
  );

  // ** Send Transaction **
  let txn = await fillOrderMethod
    .send(
      orderId,
      tokenId,
      expectedPriceInWeiEach,
      profitTo,
      sendNow,
      { from: sender, value: 0 },
      (err, transactionHash) => {
        if (err) {
          userRejectedCallback();
        } else {
          txSubmitCallback();
        }
      }
    )
    .on("receipt", () => {
      txConfirmedCallback();
    });

  // ** Just return the txn object **
  return txn;
};

export default fillOrder;
