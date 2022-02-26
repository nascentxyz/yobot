// ** Define our deployed contract addresses * //
// ?? Goerli is the only supported testnet since that's the only testnet with flashbot support
const DeployedContracts = {
  // mainnet
  1: {
    YobotERC721LimitOrder: "0x715da5e53526bEdaC9Bd96e8FDB7eFb185D1B6CA",
  },
  // goerli
  5: {
    YobotERC721LimitOrder: "0x20340e29ba445553f6a5c1b8d30f405b3447664d",
  },
};

const DeployedContractsV1 = {
  // mainnet
  1: {
    YobotArtBlocksBroker: "",
    YobotERC721LimitOrder: "",
  },
  // Ropsten
  3: {
    YobotArtBlocksBroker: "",
    YobotERC721LimitOrder: "",
  },
  // rinkeby
  4: {
    YobotArtBlocksBroker: "0x1b78c74b301aa66c3da90556be7290eb2dcc2864",
    YobotERC721LimitOrder: "0x8b5842a935731ed1b92e3211a7f38bebd185eb53",
  },
  // goerli
  5: {
    YobotArtBlocksBroker: "0x041761ca2d7730ae3788f732c1a43db002feff2f",
    YobotERC721LimitOrder: "0x0d29790c2412f42248905f879260f1a6f409a11a",
  },
};

export default DeployedContracts;
