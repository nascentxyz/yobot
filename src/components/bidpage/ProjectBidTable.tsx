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
import { ConnectWallet, NoShadowButton } from "src/components";
import { useTranslation } from "react-i18next";
import {
  onTxSubmitted,
  onTxFailed,
  userRejectedCallback,
  onTxConfirmed,
} from "src/utils";
import { parseAction } from "src/contexts/utils";

const ProjectBidTable = ({ props }) => {
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
  const [cancellingOrder, setCancellingOrder] = useState(false);

  // ** On actions refresh, filter and set a user's actions **
  useEffect(() => {
    if (props.gettingActions) {
      setOrders([]);
    } else {
      setOrders(props.userBids);
    }
  }, [
    props.userBids,
    props.gettingActions,
    actions,
    address,
    chainId,
    openOrders,
  ]);

  const cancelOrder = async (orderNum) => {
    setCancellingOrder(true);
    let _cancelOrderTx = await yobot.YobotERC721LimitOrder.cancelOrder(
      yobot.web3, // web3
      yobot.YobotERC721LimitOrder.YobotERC721LimitOrder, // yobotERC721LimitOrder
      orderNum, // props.tokenAddress,
      address, // sender
      async () => {
        onTxSubmitted();
      }, // txSubmitCallback
      async () => {
        onTxFailed();
        setCancellingOrder(false);
      }, // txFailCallback
      async (msg) => {
        // txConfirmedCallback

        // FIXME: we want to repull ALL events across all of Yobot every time a tx is confirmed?
        onTxConfirmed(msg);
        setCancellingOrder(false);
        refreshEvents();
      },
      async () => {
        userRejectedCallback();
        setCancellingOrder(false);
      } // userRejectedCallback
    );
  };

  const getStatusCell = (status) => {
    if (status == "ORDER_FILLED") {
      return (
        <>
          <span className="inline-block w-4 h-4 bg-orange-300 rounded-full md:hidden">
            &nbsp;
          </span>
          <div className=" px-2 py-1 text-xs font-semibold leading-4 text-orange-700 bg-orange-200 rounded-full md:inline-block">
            Successful
          </div>
        </>
      );
    } else if (status == "ORDER_CANCELLED") {
      return (
        <>
          <span className="inline-block w-4 h-4 bg-orange-300 rounded-full md:hidden">
            &nbsp;
          </span>
          <div className=" px-2 py-1 text-xs font-semibold leading-4 text-orange-700 bg-orange-200 rounded-full md:inline-block">
            Cancelled
          </div>
        </>
      );
    } else {
      // if (cancellingOrder) {
      //   return <Spinner margin={"auto"} color={"red.400"} />;
      // } else {
      return (
        <>
          <span className="inline-block w-4 h-4 bg-green-300 rounded-full md:hidden">
            &nbsp;
          </span>
          <div className="hidden px-2 py-1 text-xs font-semibold leading-4 text-green-700 bg-green-200 rounded-full md:inline-block">
            Live
          </div>
        </>
      );
    }
    // }
  };

  return (
    <div className="container mx-auto xl:max-w-7xl ">
      <div className="rounded-xl min-w-full  overflow-x-auto bg-gray-800  ">
        <table className="min-w-full text-sm align-middle text-center">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-sm font-semibold tracking-wider  text-gray-300 uppercase bg-gray-700">
                Date Placed
              </th>
              <th className="p-3 text-sm text-center font-semibold tracking-wider sm:text-left text-gray-300 uppercase bg-gray-700">
                Quantity
              </th>
              <th className="hidden p-3 text-sm font-semibold tracking-wider text-center text-gray-300 uppercase bg-gray-700 md:table-cell">
                Price Per NFT (Ξ)
              </th>
              <th className="p-3 text-sm font-semibold tracking-wider text-center text-gray-300 uppercase bg-gray-700">
                Status
              </th>
              <th className="p-3 text-sm font-semibold tracking-wider text-center text-gray-300 uppercase bg-gray-700">
                Cancel
              </th>
            </tr>
          </thead>

          <tbody>
            {isAuthed && (props.gettingActions || props.submittingBid) ? (
              <tr className="p-4">
                <Spinner
                  padding="1em"
                  ml="1em"
                  mt="1em"
                  mb="1em"
                  align="center"
                  color={"blue.400"}
                />
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => {
                const {
                  date_time,
                  date_year,
                  quantity,
                  price,
                  status,
                  order_num,
                } = order;

                return (
                  <tr key={Object.entries(order).toString()}>
                    <td className="p-3">
                      <p className="font-medium">{date_time}</p>
                      <p className="text-gray-500">{date_year}</p>
                    </td>
                    <td className="p-3 text-center text-gray-500 sm:text-left md:table-cell">
                      {quantity}
                    </td>
                    <td className="hidden p-3 text-center text-gray-500 md:table-cell">
                      {price}
                    </td>
                    <td className="p-3 text-center">{getStatusCell(status)}</td>
                    <td className="p-3 text-center">
                      {status == "ORDER_PLACED" ? (
                        !cancellingOrder ? (
                          <button
                            type="button"
                            onClick={() => cancelOrder(order_num)}
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
                        <p className="text-gray-500 md:table-cell">N/A</p>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="p-4">
                <Text padding="1em" marginLeft="1em" align="start">
                  {t("No bids placed")}
                </Text>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectBidTable;
