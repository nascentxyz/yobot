import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { alchemyMainnetURL, alchemyRinkebyURL } from "src/utils";

// ** Launch a Lazy Modal **
async function launchModalLazy(
  t: (text: string, extra?: any) => string,
  cacheProvider: boolean = true
) {
  console.log(localStorage.getItem("walletconnect"));
  const providerOptions = {
    injected: {
      display: {
        description: t("Connect with a browser extension"),
      },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: alchemyMainnetURL,
          4: alchemyRinkebyURL,
        },
      },
      display: {
        description: t("Scan with a wallet to connect"),
      },
    },
  };

  if (!cacheProvider) {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
  }
  
  const web3Modal = new Web3Modal({
    cacheProvider,
    providerOptions,
    theme: {
      background: "#121212",
      main: "#FFFFFF",
      secondary: "#858585",
      border: "#272727",
      hover: "#000000",
    },
  });
  return await web3Modal.connect();
};

export default launchModalLazy;
