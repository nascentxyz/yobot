/* eslint-disable */
import Web3 from "web3";

import DeployedContracts from "./DeployedContracts";
// import { Cache, Governance } from "./";

// ** Import Contract Wrappers **
import { YobotArtBlocksBroker, YobotERC721LimitOrder } from "./wrappers";

// ** Class Definition **
class Yobot {
  // ** Types **
  web3: Web3;
  // governance: Governance;

  // ** Composed Classes **
  YobotArtBlocksBroker: YobotArtBlocksBroker;
  YobotERC721LimitOrder: YobotERC721LimitOrder;

  // ** Statically defined supported contract helper **
  public static isSupportedChain = (chainId: number) => {
    console.log("in isSupportedChain, checking chain id:", chainId);
    console.log(Object.keys(DeployedContracts));
    console.log(Object.keys(DeployedContracts).includes(chainId.toString()));
    return Object.keys(DeployedContracts).includes(chainId.toString());
  };

  constructor(web3Provider) {
    // ** Provider Logic **
    this.web3 = new Web3(web3Provider);

    // ** Initiate Contract Wrappers **
    this.YobotArtBlocksBroker = new YobotArtBlocksBroker(web3Provider);
    this.YobotERC721LimitOrder = new YobotERC721LimitOrder(web3Provider);

    // ** Initiate Governance **
    // this.governance = new Governance(this.web3);
  }
}

export default Yobot;
export {
  Yobot,
  DeployedContracts,
  // Governance,
  // Cache
};
