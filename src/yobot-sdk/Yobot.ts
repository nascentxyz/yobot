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
  pools: { [key: string]: any };
  governance: Governance;
  getEthUsdPriceBN: () => Big;

  // ** Place Bid Functions **
  validateBid: () => Promise<any>;
  placeBid: () => Promise<any>;

  // ** Cancel Bid Functions **
  cancelBid: () => Promise<any>;

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

    // ** Helper function to fetch ETH/USD Price
    this.getEthUsdPriceBN = async function () {
      return await self.cache.getOrUpdate("ethUsdPrice", async function () {
        try {
          return Web3.utils.toBN(
            new Big(
              (
                await axios.get(
                  "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum"
                )
              ).data.ethereum.usd
            )
              .mul(1e18)
              .toFixed(0)
          );
        } catch (error) {
          throw new Error("Error retrieving data from Coingecko API: " + error);
        }
      });
    };

    // ** Initiate Governance **
    this.governance = new Governance(this.web3);

    /*///////////////////////////////////////////////////////////////
                        Place Order Functions
    //////////////////////////////////////////////////////////////*/

    this.validateBid = async function (currencyCode, amount, sender) {
      // ** Input validation **
      if (!sender) throw new Error("Sender parameter not set.");
      if (currencyCode !== "ETH") throw new Error("Invalid currency code!");
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

    this.placeBid = async function (
      currencyCode,
      price,
      quantity,
      artBlocksProjectId,
      minEthAmount,
      options
    ) {
      // ** Input Validation **
      if (!options || !options.from)
        throw new Error("Options parameter not set or from address not set.");
      if (currencyCode !== "ETH") throw new Error("Invalid currency code!");
      if (!price || price.lte(Web3.utils.toBN(0)))
        throw new Error("NFT price must be greater than 0!");
      if (!quantity || quantity.lte(Web3.utils.toBN(0)))
        throw new Error("Quantity must be greater than 0!");
      if (!artBlocksProjectId || artBlocksProjectId.lte(Web3.utils.toBN(0)))
        throw new Error("ArtBlocks Project Id must be greater than 0!");

      // ** Calculate value to send **
      let totalCost = price * quantity;

      // ** Get Account Balance BN **
      var accountBalanceBN = Web3.utils.toBN(
        await self.web3.eth.getBalance(options.from)
      );
      if (totalCost.gt(accountBalanceBN))
        throw new Error(
          "Not enough balance in your account to place a bid of that size."
        );

      // ** More Input Validation **
      if (options.value && options.value.toString() !== totalCost.toString())
        throw new Error(
          "Value set in options paramater but not equal to the total cost."
        );

      // ** Check amountUsdBN against minEthAmount **
      if (
        typeof minEthAmount !== "undefined" &&
        minEthAmount !== null &&
        totalCost.lt(minEthAmount)
      )
        return [amount];

      // ** Place Bid on YobotArtBlocksBroker **
      options.value = totalCost;
      var receipt = await self.YobotArtBlocksBroker.methods
        .placeOrder(artBlocksProjectId, quantity)
        .send(options);

      // ** Return **
      return [amount, null, null, receipt];
    };

    /*///////////////////////////////////////////////////////////////
                        Cancel Order Functions
    //////////////////////////////////////////////////////////////*/

    this.cancelBid = async function (options) {
      // ** Input Validation **
      if (!options || !options.from)
        throw new Error("Options parameter not set or from address not set.");

      // ** Try to cancel order **
      try {
        var receipt = await self.YobotArtBlocksBroker.methods
          .cancelOrder()
          .send(options);
      } catch (err) {
        throw new Error(
          "YobotArtBlocksBroker.cancelOrder failed: " +
            (err.message ? err.message : err)
        );
      }

      return [amount, null, receipt];
    };
  }
}

export default Yobot;
