import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Spinner,
  Text,
  Flex,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useYobot } from "src/contexts/YobotContext";
import { Yobot } from "src/yobot-sdk/index";
import { ConnectWallet, NoShadowButton } from "src/components";
import { useTranslation } from "react-i18next";
import {
  onTxSubmitted,
  onTxFailed,
  userRejectedCallback,
  onTxConfirmed,
  getNetworkPrefix,
} from "src/utils";
import { parseAction } from "src/contexts/utils";
import { OrderStatus } from "./BidPageMain";

const ProjectFillTable = ({ props }) => {
  const { t } = useTranslation();
  const {
    yobot,
    isAuthed,
    chainId,
    actions,
    address,
    refreshEvents,
    openOrders,
  } = useYobot();
  const [orders, setOrders] = useState([]);
  const [fillingOrder, setFillingOrder] = useState(false);

  // ** On actions refresh, filter and set a user's actions **
  useEffect(() => {
    if (Yobot.isSupportedChain(chainId)) {
      setOrders(props.gettingActions ? [] : props.allBids);
    }
  }, [
    props.allBids,
    props.gettingActions,
    actions,
    address,
    chainId,
    openOrders,
  ]);

  const fillOrder = async (orderNum) => {
    setFillingOrder(true);

    // TODO: get the token id to fill from the user

    let _cancelOrderTx = await yobot.YobotERC721LimitOrder.fillOrder(
      yobot.web3, // web3
      yobot.YobotERC721LimitOrder.YobotERC721LimitOrder, // yobotERC721LimitOrder
      orderNum, // props.tokenAddress,
      address, // sender
      async () => {
        onTxSubmitted();
      }, // txSubmitCallback
      async () => {
        onTxFailed();
        setFillingOrder(false);
      }, // txFailCallback
      async (msg) => {
        // txConfirmedCallback

        // FIXME: we want to repull ALL events across all of Yobot every time a tx is confirmed?
        onTxConfirmed(msg);
        setFillingOrder(false);
        refreshEvents();
      },
      async () => {
        userRejectedCallback();
        setFillingOrder(false);
      } // userRejectedCallback
    );
  };

  const getStatusCell = (status, placedLink, filledLink, cancelledLink) => {
    // FIXME: how to display filled link if order is only partially-filled?
    if (status == OrderStatus.Filled) {
      return (
        <a href={filledLink}>
          <span className="inline-block w-4 h-4 bg-orange-300 rounded-full md:hidden">
            &nbsp;
          </span>
          <div className="px-2 py-1 text-xs font-semibold leading-4 text-orange-700 bg-orange-200 rounded-full md:inline-block hover:text-yobotgreen">
            Filled
          </div>
        </a>
      );
    } else if (status == OrderStatus.Cancelled) {
      return (
        <a href={cancelledLink}>
          <span className="inline-block w-4 h-4 bg-orange-300 rounded-full md:hidden">
            &nbsp;
          </span>
          <div className="px-2 py-1 text-xs font-semibold leading-4 text-orange-700 bg-orange-200 rounded-full md:inline-block hover:text-yobotgreen">
            Cancelled
          </div>
        </a>
      );
    } else {
      // if partially-filled or just placed
      return (
        <>
          <span className="inline-block w-4 h-4 bg-green-300 rounded-full md:hidden">
            &nbsp;
          </span>
          <div className="hidden px-2 py-1 text-xs font-semibold leading-4 text-green-700 bg-green-200 rounded-full md:inline-block">
            Open
          </div>
        </>
      );
    }
    // }
  };

  return (
    <div className="container mx-auto xl:max-w-7xl ">
      <div className="rounded-xl min-w-full overflow-x-auto bg-zinc">
        <table className="min-w-full text-sm align-middle text-center">
          <thead>
            <tr className=" bg-yobotblack text-lg text-textgraylight">
              <th className="p-3 font-semibold tracking-wider ">Date Placed</th>
              <th className="p-3 font-semibold tracking-wider text-center">
                Quantity Filled
              </th>
              <th className="p-3 font-semibold tracking-wider text-center">
                Price Per NFT (Ξ)
              </th>
              <th className="p-3 font-semibold tracking-wider text-center">
                Status
              </th>
              <th className="p-3 font-semibold tracking-wider text-center ">
                Fill
              </th>
            </tr>
          </thead>
          <tbody className="">
            {Yobot.isSupportedChain(chainId) &&
            isAuthed &&
            (props.gettingActions) ? (
              <tr className="p-4 ">
                <td>
                  <Spinner
                    padding="1em"
                    ml="1em"
                    mt="1em"
                    mb="1em"
                    align="center"
                    color={"blue.400"}
                  />
                </td>
              </tr>
            ) : Yobot.isSupportedChain(chainId) &&
              isAuthed &&
              orders.length > 0 ? (
              orders.map((order) => {
                const {
                  placed_time,
                  placed_year,
                  price,
                  remaining_qty,
                  orig_qty,
                  status,
                  order_num,
                  place_tx_hash,
                  fill_tx_hash,
                  cancel_tx_hash,
                } = order;

                const etherscanLink =
                  "https://" +
                  (chainId > 0 ? getNetworkPrefix(chainId) : "") +
                  "etherscan.io/tx/";

                const placedEtherscanLink = etherscanLink + place_tx_hash;
                const filledEtherscanLink = etherscanLink + fill_tx_hash;
                const cancelledEtherscanLink = etherscanLink + cancel_tx_hash;

                return (
                  <tr className="" key={Object.entries(order).toString()}>
                    <td className="p-3">
                      <a
                        href={placedEtherscanLink}
                        className="font-medium hover:text-yobotgreen"
                      >
                        {placed_time}
                      </a>
                      <p className="text-gray-500">{placed_year}</p>
                    </td>
                    <td className="p-3 text-center text-gray-500 md:table-cell">
                      {orig_qty - remaining_qty} / {orig_qty}
                    </td>
                    <td className="hidden p-3 text-center text-gray-500 md:table-cell">
                      {price}
                    </td>
                    <td className="p-3 text-center">
                      {getStatusCell(
                        status,
                        placedEtherscanLink,
                        filledEtherscanLink,
                        cancelledEtherscanLink
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {status == OrderStatus.Placed ||
                      status == OrderStatus.Partially_Filled ? (
                        !fillingOrder ? (
                          <button
                            type="button"
                            onClick={() => fillOrder(order_num)}
                            className="inline-flex items-center justify-center px-2 py-1 space-x-2 text-sm font-semibold leading-5 text-gray-800 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:text-gray-800 hover:bg-gray-700 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                          >
                            <svg
                              className="inline-block w-5 h-5 hi-solid hi-x"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        ) : (
                          <Spinner margin={"auto"} color={"red.400"} />
                        )
                      ) : (
                        <div></div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="p-4">
                <td>
                  <p className="ml-4 p-4 text-base text-left leading-relaxed">
                    No Open Bids
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectFillTable;
