import WalletConnectProvider from "@walletconnect/web3-provider";
import { alchemyURL } from "src/utils";

// ** Launch a Lazy Modal **
const launchModalLazy = (
  t: (text: string, extra?: any) => string,
  cacheProvider: boolean = true
) => {
  const providerOptions = {
    injected: {
      display: {
        description: t("Connect with a browser extension"),
      },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider.default,
      options: {
        rpc: {
          1: alchemyURL,
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

  return web3Modal.connect();
};

export default launchModalLazy;
