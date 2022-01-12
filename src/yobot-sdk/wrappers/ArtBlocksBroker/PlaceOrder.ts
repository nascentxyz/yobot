import Web3 from "web3";

// TODO: can we refactor this?
interface PlaceOrderProps {
  web3: Web3;
  yobotArtBlocksBroker: any;
  price: number;
  quantity: number;
  artBlocksProjectId: number;
  sender: string;
  txSubmitCallback: any;
  txFailCallback: any;
  txConfirmedCallback: any;
  userRejectedCallback: any;
}

// ** ArtBlocks Place Order function **
const placeOrder = async (
  web3: Web3,
  yobotArtBlocksBroker: any,
  price: number,
  quantity: number,
  artBlocksProjectId: number,
  sender: string,
  txSubmitCallback: any,
  txFailCallback: any,
  txConfirmedCallback: any,
  userRejectedCallback: any
) => {
  // ** Price must be greater than 0 **
  if (!price || price <= 0)
    throw new Error("NFT price must be greater than 0!");

  // ** Quantity must be greater than 0 **
  if (!quantity || quantity <= 0)
    throw new Error("Quantity must be greater than 0!");

  // ** ArtBlocks Project Id must be greater than 0 **
  if (!artBlocksProjectId || artBlocksProjectId <= 0)
    throw new Error("ArtBlocks Project Id must be greater than 0!");

  // ** Calculate value to send **
  let totalCost = price * quantity;
  let amountToSend = web3.utils.toWei(totalCost.toString(), "ether");

  // ** Get Account Balance ethers **
  let accountBalanceEthers = parseFloat(
    Web3.utils.fromWei(await web3.eth.getBalance(sender), "ether")
  );

  // ** Make sure the user has enough eth in their account to send **
  if (totalCost > accountBalanceEthers)
    throw new Error(
      "Not enough balance in your account to place a Order of that size."
    );

  // ** Extract placeOrder method from the YobotArtBlocksBroker Contract **
  let placeOrderMethod = yobotArtBlocksBroker.methods.placeOrder(
    artBlocksProjectId,
    quantity
  );

  // ** Send Transaction **
  let txn = await placeOrderMethod
    .send(
      artBlocksProjectId,
      quantity,
      { from: sender, value: amountToSend },
      (err, transactionHash) => {
        if (err) {
          userRejectedCallback();
        } else {
          txSubmitCallback();
        }
      }
    )
    .on("receipt", () => {
      txConfirmedCallback("⚔️ Placed Order ⚔️");
    });

  // ** Just return the txn object **
  return txn;
};

export default placeOrder;
