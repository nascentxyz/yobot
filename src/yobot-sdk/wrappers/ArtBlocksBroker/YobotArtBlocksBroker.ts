/* eslint-disable */
import Web3 from "web3";

import { DeployedContracts } from "../../";
import { placeOrder, cancelOrder } from ".";

// ** Import the Contract Abis **
var YobotArtBlocksBrokerAbi = require(".." + "/abi/YobotArtBlocksBroker.json");

// ** Class Definition **
class YobotArtBlocksBroker {
  // ** Types **
  web3: Web3;

  // ** Contracts
  YobotArtBlocksBroker: any;

  // ** ArtBlocks Functions **
  placeOrder: (
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
  ) => Promise<any>;

  cancelOrder: (
    web3: Web3,
    yobotArtBlocksBroker: any,
    artBlocksProjectId: number,
    sender: string,
    txSubmitCallback: any,
    txFailCallback: any,
    txConfirmedCallback: any,
    userRejectedCallback: any
  ) => Promise<any>;

  // ** Class Statics **
  static Web3 = Web3;
  static YOBOT_ART_BLOCKS_BROKER_ABI = YobotArtBlocksBrokerAbi;

  // ** Constructor Definition **
  constructor(web3Provider) {
    // ** Provider Logic **
    this.web3 = new Web3(web3Provider);

    // ** Initiate Contracts **
    this.web3.eth.getChainId().then((chain_id) => {
      console.log("YobotArtBlocksBroker got web3 chain id:", chain_id);
      this.YobotArtBlocksBroker = new this.web3.eth.Contract(
        YobotArtBlocksBrokerAbi,
        DeployedContracts[chain_id]
          ? DeployedContracts[chain_id]["YobotArtBlocksBroker"]
          : ""
      );
    });

    // ** Contract Functions **
    this.placeOrder = placeOrder;
    this.cancelOrder = cancelOrder;
  }
}

export default YobotArtBlocksBroker;
