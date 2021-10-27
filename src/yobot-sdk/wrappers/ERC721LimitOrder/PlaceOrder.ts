import Web3 from "web3";

// TODO: can we refactor this?
interface PlaceOrderProps {
  web3: Web3;
  yobotERC721LimitOrder: any;
  price: number;
  quantity: number;
  tokenAddress: string;
  sender: string;
  txSubmitCallback: any;
  txFailCallback: any;
  txConfirmedCallback: any;
  userRejectedCallback: any;
}

// ** Generalized ERC721 Place Order function **
const placeOrder = async (
  web3: Web3,
  yobotERC721LimitOrder: any,
  price: number,
  quantity: number,
  tokenAddress: string,
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

  // ** ERC721 Token Address must be valid **
  if (!tokenAddress) throw new Error("Invalid ERC721 Token address!");

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

  // ** Extract placeOrder method from the YobotERC721LimitOrder Contract **
  let placeOrderMethod = yobotERC721LimitOrder.methods.placeOrder(
    tokenAddress,
    quantity
  );

  // ** Send Transaction **
  let txn = await placeOrderMethod
    .send(
      tokenAddress,
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
