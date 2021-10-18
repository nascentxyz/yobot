export const alchemyURL = `https://eth-mainnet.alchemyapi.io/v2/${
  process.env.ALCHEMY_PROD_API_KEY ? process.env.ALCHEMY_PROD_API_KEY : ""
}`;
export const testnetURL = `http://localhost:8545`;

export function chooseBestWeb3Provider() {
  console.log("in choose best web3 provider function");
  if (typeof window === "undefined") {
    console.log("window undefined... best provider=", alchemyURL);
    return alchemyURL;
  }

  if (window.ethereum) {
    console.log("found window.ethereum:", window.ethereum);
    return window.ethereum;
  } else if (window.web3) {
    console.log("found window.web3:", window.web3.currentProvider);
    return window.web3.currentProvider;
  } else {
    console.log("returning alchemyURL :( ", alchemyURL);
    return alchemyURL;
  }
}

// TODO: Rip out fuse-sdk and replace with yobot-sdk
// export const initFuseWithProviders = (provider = chooseBestWeb3Provider()) => {
//   // const fuse = new Fuse(provider);

//   // @ts-ignore We have to do this to avoid Infura ratelimits on our large calls.
//   // fuse.contracts.FusePoolLens.setProvider(alchemyURL);

//   // return fuse;
// };