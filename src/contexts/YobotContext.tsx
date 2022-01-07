import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LogRocket from "logrocket";
import { useToast } from "@chakra-ui/react";
import { formatEther } from "@ethersproject/units";
import Web3Modal from "web3modal";

import { launchModalLazy /* ViewOrdersProps */ } from "./utils";
import { Yobot } from "src/yobot-sdk/index";
import { chooseBestWeb3Provider } from "src/utils";

export interface Order {
  priceInWeiEach: number;
  quantity: number;
}

export interface YobotContextData {
  yobot: Yobot;
  web3ModalProvider: any | null;
  isAuthed: boolean;
  login: (cacheProvider?: boolean) => Promise<any>;
  logout: () => any;
  address: string;
  // ** account ethers balance in ETH **
  balance: number;
  chainId: number;
  isAttemptingLogin: boolean;
  // ** YobotERC721LimitOrder Specific Contract Data **
  actions: any[];
  // openOrders: Order[];
  // fetchOpenOrders: React.SFC<ViewOrdersProps>;
  setSelectedChainId: any; //React.SFC<[]>;
  refreshEvents: any;
}

const EmptyAddress = "0x0000000000000000000000000000000000000000";
const YobotContext = createContext<YobotContextData | undefined>(undefined);

const YobotProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const { query } = useRouter();

  const [yobot, setYobot] = useState<Yobot>(
    () => new Yobot(chooseBestWeb3Provider())
  );

  const [isAttemptingLogin, setIsAttemptingLogin] = useState<boolean>(false);
  const toast = useToast();

  // ** Save chainId for context switches **
  const [chainId, setChainId] = useState<number>(1);

  // ** Only allow one network toast notification at a time **
  const [toastingNetwork, setToastingNetwork] = useState(false);

  // ** Lock setting yobot and address
  const [updatingLock, setUpdatingLock] = useState(false);

  // ** Action store for all events **
  const [actions, setActions] = useState<any[]>([]);

  // ** Selected Chain ID **
  const [selectedChainId, setSelectedChainId] = useState<number>(1);

  // ** Refresh chain id **
  const refreshChainId = ({ yobotInstance = yobot }) => {
    if (!toastingNetwork) {
      setToastingNetwork(true);
      Promise.all([
        yobotInstance.web3.eth.net.getId(),
        yobotInstance.web3.eth.getChainId(),
      ]).then(([netId, currChainId]) => {
        setChainId(currChainId);

        // ** We also want to automatically change selected chain id if the user manually changes their wallet network **
        // ** Check if supported chain **
        if (Yobot.isSupportedChain(currChainId)) {
          // this will set the `selectedChainId`
          // which sets the network shown in the sushi button
          setSelectedChainId(currChainId);
        } else {
          // ** Prevent Fast Reentrancy
          setTimeout(() => {
            toast({
              title: "Wrong network!",
              description:
                "You are on the wrong network! Switch to a supported chain and reload this page!",
              status: "warning",
              position: "bottom",
              duration: 3000,
              isClosable: true,
            });
            setTimeout(() => setToastingNetwork(false), 3000);
          }, 1500);
        }
      });
    }
  };

  const [address, setAddress] = useState<string>(EmptyAddress);
  const [balance, setBalance] = useState<number>(0);
  const [web3ModalProvider, setWeb3ModalProvider] = useState<any | null>(null);

  const [chainChange, setChainChange] = useState<boolean>(false);

  // ** For successfuly chain change toast
  useEffect(() => {
    if (chainChange) {
      setChainChange(false);
      if (address !== EmptyAddress && chainId === 4) {
        // ** Prevent Fast Reentrancy
        setTimeout(() => {
          toast({
            title: "Connected!",
            description: "Connected to the correct network!",
            status: "success",
            position: "bottom",
            duration: 3000,
            isClosable: true,
          });
        }, 1500);
      }
    }
  }, [chainId]);

  // ** Refactored helper function to refresh events **
  const refreshEvents = () => {
    if (yobot) {
      yobot.YobotERC721LimitOrder.fetchActions(
        yobot.web3,
        yobot.YobotERC721LimitOrder.YobotERC721LimitOrder
      ).then((events) => {
        setActions(events);
      });
    }
  };

  // ** On auth login, try to fetch all events **
  useEffect(() => {
    refreshEvents();
  }, [address]);

  const setYobotAndAddressFromModal = useCallback(
    (modalProvider) => {
      const yobotInstance = new Yobot(modalProvider);
      setYobot(yobotInstance);

      yobotInstance.web3.eth.getAccounts().then((addresses) => {
        if (addresses.length === 0) {
          if (typeof window !== "undefined") {
            setIsAttemptingLogin(true);
            logout();
            setAddress(EmptyAddress);
            return;
          }
        }

        // ** We only want to refresh the chain id and do the rest if we have addresses **
        refreshChainId({ yobotInstance });

        // ** Set the new address **
        const address = addresses[0] as string;
        const requestedAddress = query.address as string;
        LogRocket.identify(address);
        setAddress(requestedAddress ?? address);

        // ** Get the selected address balance
        yobotInstance.web3.eth
          .getBalance(requestedAddress ?? address)
          .then((bal) => {
            setBalance(parseFloat(formatEther(bal)));

            // TODO: show connected balance here ??
          })
          .catch((balance_err) =>
            console.error(
              "Failed to get account ethers with error:",
              balance_err
            )
          );
      });
    },
    [setYobot, setAddress]
  );

  const login = useCallback(
    async (cacheProvider: boolean = true) => {
      try {
        setIsAttemptingLogin(true);
        let provider = await launchModalLazy(t, cacheProvider);
        setWeb3ModalProvider(provider);
        setYobotAndAddressFromModal(provider);
        setIsAttemptingLogin(false);
      } catch (err) {
        // TODO: should display error toast if failed to login/connect?
        setIsAttemptingLogin(false);
        return console.error(err);
      }
    },
    // fixme: add `t` to hook dependencies list
    [setWeb3ModalProvider, setYobotAndAddressFromModal, setIsAttemptingLogin]
  );

  const refetchAccountData = useCallback(() => {
    setYobotAndAddressFromModal(web3ModalProvider);
  }, [setYobotAndAddressFromModal, web3ModalProvider]);

  const logout = useCallback(() => {
    setWeb3ModalProvider((past: any) => {
      if (past?.off) {
        past.off("accountsChanged", refetchAccountData);
        past.off("chainChanged", refetchAccountData);
      }

      return null;
    });

    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    setAddress(EmptyAddress);
  }, [setWeb3ModalProvider, refetchAccountData]);

  // Use this effect only when `login` callback fxn changes
  useEffect(() => {
    // refreshChainId({});
    if (localStorage.WEB3_CONNECT_CACHED_PROVIDER && !isAttemptingLogin) {
      login();
    }
  }, [login]);

  useEffect(() => {
    if (web3ModalProvider !== null && web3ModalProvider.on) {
      web3ModalProvider.on("accountsChanged", refetchAccountData);
      web3ModalProvider.on("chainChanged", refetchAccountData);
    }
    return () => {
      if (web3ModalProvider?.off) {
        web3ModalProvider.off("accountsChanged", refetchAccountData);
        web3ModalProvider.off("chainChanged", refetchAccountData);
      }
    };
  }, [web3ModalProvider, refetchAccountData]);

  const value = useMemo(
    () => ({
      web3ModalProvider,
      yobot,
      isAuthed: address !== EmptyAddress,
      login,
      logout,
      address,
      balance,
      chainId,
      isAttemptingLogin,
      actions,
      setSelectedChainId,
      refreshEvents,
    }),
    [
      yobot,
      web3ModalProvider,
      login,
      logout,
      address,
      balance,
      chainId,
      isAttemptingLogin,
      actions,
      setSelectedChainId,
      refreshEvents,
    ]
  );

  return (
    <YobotContext.Provider value={value}>{children}</YobotContext.Provider>
  );
};

const useYobot = () => {
  const context = useContext(YobotContext);

  if (context === undefined) {
    throw new Error(`useYobot must be used within a YobotProvider`);
  }

  return context;
};

// ** Exports
export {
  useYobot,
  YobotProvider,
  EmptyAddress,
  // InternalWeb3Context,
  launchModalLazy,
};
