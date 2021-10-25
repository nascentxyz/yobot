/* eslint-disable */
import Web3 from "web3";
import axios from "axios";
import Big from "big.js";

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
  getEthUsdPriceBN: () => Big;

  // ** Place Bid Functions **
  validateBid: (amount: number, sender: string) => Promise<any>;
  placeBid: (
    price: number,
    quantity: number,
    artBlocksProjectId: number,
    sender: string,
    txSubmitCallback: any,
    txFailCallback: any,
    txConfirmedCallback: any,
    userRejectedCallback: any
  ) => Promise<any>;

  // ** Cancel Bid Functions **
  cancelBid: (
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
      YobotArtBlocksBrokerAbi.abi,
      contractAddresses["mainnet"]["YobotArtBlocksBroker"]
    );
    this.YobotERC721LimitOrder = new this.web3.eth.Contract(
      YobotERC721LimitOrderAbi.abi,
      contractAddresses["mainnet"]["YobotERC721LimitOrder"]
    );

    var self = this;

    // ** Initiate Governance **
    this.governance = new Governance(this.web3);

    /*///////////////////////////////////////////////////////////////
                        Place Order Functions
    //////////////////////////////////////////////////////////////*/

    this.validateBid = async function (
      amount: number,
      sender: string
    ) {
      // ** Input validation **
      if (!sender) throw new Error("Sender parameter not set.");
      if (!amount || amount.lte(Web3.utils.toBN(0)))
        throw new Error("Deposit amount must be greater than 0!");

      // ** Get Account Balance BN **
      var accountBalanceBN = Web3.utils.toBN(
        await self.web3.eth.getBalance(sender)
      );
      if (amount.gt(accountBalanceBN))
        throw new Error(
          "Not enough balance in your account to make a deposit of this amount."
        );

      // ** Return amountUsdBN **
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
      if (!price || price.lte(Web3.utils.toBN(0)))
        throw new Error("NFT price must be greater than 0!");

      // ** Quantity must be greater than 0 **
      if (!quantity || quantity.lte(Web3.utils.toBN(0)))
        throw new Error("Quantity must be greater than 0!");

      // ** ArtBlocks Project Id must be greater than 0 **
      if (!artBlocksProjectId || artBlocksProjectId.lte(Web3.utils.toBN(0)))
        throw new Error("ArtBlocks Project Id must be greater than 0!");

      // ** Calculate value to send **
      let totalCost = price * quantity;
      let amountToSend = this.web3.utils.toWei(totalCost.toString(), "ether");

      // ** Get Account Balance BN **
      var accountBalanceBN = Web3.utils.toBN(
        await self.web3.eth.getBalance(options.from)
      );

      // ** Make sure the user has enough eth in their account to send **
      if (totalCost.gt(accountBalanceBN))
        throw new Error(
          "Not enough balance in your account to place a bid of that size."
        );

      // ** Extract placeOrder method from the YobotArtBlocksBroker Contract **
      let placeOrderMethod = this.YobotArtBlocksBroker.methods.placeOrder();
      console.log("Sending place ArtBlocksBid to method:", placeOrderMethod);

      // ** Send Transaction **
      let txn = await placeOrderMethod.send(
        artBlocksProjectId,
        quantity,
        { from: address, value: amountToSend },
        (err, transactionHash) => {
          if(err) {
            console.log("TRANSACTION_FAILED:", err);
            userRejectedCallback();
          } else {
            console.log("TRANSACTION_SUBMITTED:", transactionHash);
            txSubmitCallback();
          }
        }
      ).on('receipt', () => {
        txConfirmedCallback('⚔️ Placed Order ⚔️')
      });

      // ** Just return the txn object **
      return txn;
    };

    /*///////////////////////////////////////////////////////////////
                        Cancel Order Functions
    //////////////////////////////////////////////////////////////*/

    // ** Cancel a placed order **
    // ** internally, removes any data stores and returns the user their funds **
    this.cancelBid = async function (
      artBlocksProjectId: number,
      sender: string,
      txSubmitCallback: any,
      txFailCallback: any,
      txConfirmedCallback: any,
      userRejectedCallback: any
    ) {
      console.log("In cancelBid function...");

      // ** ArtBlocks Project Id must be greater than 0 **
      if (!artBlocksProjectId || artBlocksProjectId.lte(Web3.utils.toBN(0)))
        throw new Error("ArtBlocks Project Id must be greater than 0!");

      // ** Extract cancelOrder method from the YobotArtBlocksBroker Contract **
      let cancelOrderMethod = this.YobotArtBlocksBroker.methods.cancelOrder();
      console.log("Sending cancel ArtBlocksBid to method:", cancelOrderMethod);

      // ** Send Transaction **
      let txn = await cancelOrderMethod.send(
        artBlocksProjectId,
        { from: address },
        (err, transactionHash) => {
          if(err) {
            console.log("TRANSACTION_FAILED:", err);
            userRejectedCallback();
          } else {
            console.log("TRANSACTION_SUBMITTED:", transactionHash);
            txSubmitCallback();
          }
        }
      ).on('receipt', () => {
        txConfirmedCallback('⚔️ Placed Order ⚔️')
      });

      // ** Just return the txn object **
      return txn;
    };
  }
}

export default Yobot;
