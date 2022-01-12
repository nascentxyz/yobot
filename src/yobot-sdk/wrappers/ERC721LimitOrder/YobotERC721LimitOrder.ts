/* eslint-disable */
import Web3 from "web3";

import { DeployedContracts } from "../../";
import { placeOrder, cancelOrder, fetchAction } from ".";

// ** Import the Contract Abis **
var YobotERC721LimitOrderAbi = require(".." +
  "/abi/YobotERC721LimitOrder.json");

// ** Class Definition **
class YobotERC721LimitOrder {
  // ** Types **
  web3: Web3;

  // ** Contracts
  YobotERC721LimitOrder: any;

  // ** ERC721 Limit Order Functions **
  placeOrder: (
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
  ) => Promise<any>;

  cancelOrder: (
    web3: Web3,
    yobotERC721LimitOrder: any,
    tokenAddress: string,
    sender: string,
    txSubmitCallback: any,
    txFailCallback: any,
    txConfirmedCallback: any,
    userRejectedCallback: any
  ) => Promise<any>;

  fetchActions: (web3: Web3, yobotERC721LimitOrder: any) => Promise<any>;

  // ** Class Statics **
  static Web3 = Web3;
  static YOBOT_ERC721_LIMIT_ORDER_ABI = YobotERC721LimitOrderAbi;

  // ** Constructor Definition **
  constructor(web3Provider) {
    // ** Provider Logic **
    this.web3 = new Web3(web3Provider);

    // ** Initiate Contracts **
    this.web3.eth.getChainId().then((chain_id) => {
      this.YobotERC721LimitOrder = new this.web3.eth.Contract(
        YobotERC721LimitOrderAbi,
        DeployedContracts[chain_id]
          ? DeployedContracts[chain_id]["YobotERC721LimitOrder"]
          : ""
      );
    });

    // ** Functions **
    this.placeOrder = placeOrder;
    this.cancelOrder = cancelOrder;

    // ** Events **
    this.fetchActions = fetchAction;
  }
}

export default YobotERC721LimitOrder;
