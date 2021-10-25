/* eslint-disable */
import Web3 from "web3";

import { Cache, Governance } from "./";

// ** Define our deployed contract addresses **
const contractAddresses = {
  mainnet: {
    YobotArtBlocksBroker: "",
    YobotERC721LimitOrder: "",
  },
  rinkeby: {
    YobotArtBlocksBroker: "",
    YobotERC721LimitOrder: "",
  },
  goerli: {
    YobotArtBlocksBroker: "",
    YobotERC721LimitOrder: "",
  },
};

// ** Import the Contract Abis **
var erc20Abi = require("." + "/abi/ERC20.json");
var YobotArtBlocksBrokerAbi = require("." + "/abi/YobotArtBlocksBroker.json");
var YobotERC721LimitOrderAbi = require("." + "/abi/YobotERC721LimitOrder.json");

class Yobot {
  // ** Types **
  web3: Web3;
  cache: Cache;
  governance: Governance;

  // ** Contracts
  YobotArtBlocksBroker: object;
  YobotERC721LimitOrder: object;

  // ** Place ArtBlocks Bid Functions **
  validateBid: (amount: number, sender: string) => Promise<any>;
  placeArtBlocksBid: (
    price: number,
    quantity: number,
    artBlocksProjectId: number,
    sender: string,
    txSubmitCallback: any,
    txFailCallback: any,
    txConfirmedCallback: any,
    userRejectedCallback: any
  ) => Promise<any>;

  // ** Cancel ArtBlocks Bid Functions **
  cancelArtBlocksBid: (
    artBlocksProjectId: number,
    sender: string,
    txSubmitCallback: any,
    txFailCallback: any,
    txConfirmedCallback: any,
    userRejectedCallback: any
  ) => Promise<any>;

  // ** Class Statics **
  static Governance = Governance;
  static Web3 = Web3;
  static CONTRACT_ADDRESSES = contractAddresses;
  static ERC20_ABI = erc20Abi;
  static YOBOT_ART_BLOCKS_BROKER_ABI = YobotArtBlocksBrokerAbi;
  static YOBOT_ERC721_LIMIT_ORDER_ABI = YobotERC721LimitOrderAbi;

  // ?? web3 utils should have BN ??
  // @ts-ignore
  static BN = Web3.utils.BN;

  constructor(web3Provider) {
    // ** Provider Logic **
    this.web3 = new Web3(web3Provider);
    this.cache = new Cache({ allTokens: 86400, ethUsdPrice: 300 });

    // ** Initiate Contracts **
    this.YobotArtBlocksBroker = new this.web3.eth.Contract(
      YobotArtBlocksBrokerAbi,
      contractAddresses["mainnet"]["YobotArtBlocksBroker"]
    );
    this.YobotERC721LimitOrder = new this.web3.eth.Contract(
      YobotERC721LimitOrderAbi,
      contractAddresses["mainnet"]["YobotERC721LimitOrder"]
    );

    var self = this;

    // ** Initiate Governance **
    this.governance = new Governance(this.web3);

    /*///////////////////////////////////////////////////////////////
                        Place Order Functions
    //////////////////////////////////////////////////////////////*/

    this.validateBid = async function (amount: number, sender: string) {
      // ** Input validation **
      if (!sender) throw new Error("Sender parameter not set.");
      if (!amount || amount <=0)
        throw new Error("Deposit amount must be greater than 0!");

      // ** Get Account Balance ethers **
      let accountBalanceEthers = parseFloat(Web3.utils.fromWei(
        await self.web3.eth.getBalance(sender), 'ether'
      ));
      if (amount > accountBalanceEthers)
        throw new Error(
          "Not enough balance in your account to make a deposit of this amount."
        );

      // ** Return amount **
      return [amount];
    };

    // ** Place ArtBlocks Bid function **
    this.placeArtBlocksBid = async function (
      price: number,
      quantity: number,
      artBlocksProjectId: number,
      sender: string,
      txSubmitCallback: any,
      txFailCallback: any,
      txConfirmedCallback: any,
      userRejectedCallback: any
    ) {
      console.log("In placeArtBlocksBid function...");

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
      let amountToSend = this.web3.utils.toWei(totalCost.toString(), 'ether');

      // ** Get Account Balance ethers **
      let accountBalanceEthers = parseFloat(Web3.utils.fromWei(
        await self.web3.eth.getBalance(sender), 'ether'
      ));

      // ** Make sure the user has enough eth in their account to send **
      if (totalCost > accountBalanceEthers)
        throw new Error(
          "Not enough balance in your account to place a bid of that size."
        );

      // ** Extract placeOrder method from the YobotArtBlocksBroker Contract **
      let placeOrderMethod = this.YobotArtBlocksBroker.methods.placeOrder();
      console.log("Sending place ArtBlocksBid to method:", placeOrderMethod);

      // ** Send Transaction **
      let txn = await placeOrderMethod
        .send(
          artBlocksProjectId,
          quantity,
          { from: sender, value: amountToSend },
          (err, transactionHash) => {
            if (err) {
              console.log("TRANSACTION_FAILED:", err);
              userRejectedCallback();
            } else {
              console.log("TRANSACTION_SUBMITTED:", transactionHash);
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

    /*///////////////////////////////////////////////////////////////
                        Cancel Order Functions
    //////////////////////////////////////////////////////////////*/

    // ** Cancel a placed order **
    // ** internally, removes any data stores and returns the user their funds **
    this.cancelArtBlocksBid = async function (
      artBlocksProjectId: number,
      sender: string,
      txSubmitCallback: any,
      txFailCallback: any,
      txConfirmedCallback: any,
      userRejectedCallback: any
    ) {
      console.log("In cancelBid function...");

      // ** ArtBlocks Project Id must be greater than 0 **
      if (!artBlocksProjectId || artBlocksProjectId <= 0)
        throw new Error("ArtBlocks Project Id must be greater than 0!");

      // ** Extract cancelOrder method from the YobotArtBlocksBroker Contract **
      let cancelOrderMethod = this.YobotArtBlocksBroker.methods.cancelOrder();
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
  }
}

export default Yobot;
