import WalletConnectProvider from "@walletconnect/web3-provider";
import { MetaMask, WalletConnect } from "src/assets";

const ProviderOptions = {
  injected: {
    display: {
      logo: MetaMask,
      name: "Injected",
      description: "Connect with the provider in your Browser",
    },
    package: null,
  },
  walletconnect: {
    display: {
      logo: WalletConnect,
      name: "Mobile",
      description: "Scan qrcode with your mobile wallet",
    },
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_PROJECT_ID,
    },
  },
};

export default ProviderOptions;
