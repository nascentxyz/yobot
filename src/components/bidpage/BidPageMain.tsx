import React from "react";
import { useEffect, useState } from "react";
import { useYobot } from "src/contexts/YobotContext";
import useSWR from "swr";

import ProjectDetails from "./ProjectDetails";
import ProjectBidTable from "./ProjectBidTable";
import BidForm from "./BidForm";
import { filterOrders, parseAction, parseOrders } from "src/contexts/utils";

const BidPageMain = ({ projectId }) => {
  const { yobot, address, chainId, actions, openOrders } = useYobot();

  // ** State ** //
  const [placedOrders, setPlacedOrders] = useState([]);
  const [gettingPlaced, setGettingPlaced] = useState(true);

  const [filledOrders, setFilledOrders] = useState([]);
  const [gettingFilled, setGettingFilled] = useState(true);

  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [gettingCancelled, setGettingCancelled] = useState(true);

  const [gettingActions, setGettingActions] = useState(true);

  // ** Cumulative State ** //
  const [totalBids, setTotalBids] = useState("-");
  const [highestBidInWei, setHighestBidInWei] = useState("-");
  const [submittingBid, setSubmittingBid] = useState(false);

  // ** Filter for valid open orders ** //
  const parsedOrders = parseOrders(openOrders);
  const validOrders = filterOrders(parsedOrders);

  // ** Use SWR to load project ** //
  const fetcher = (url) =>
    fetch(url, { headers: { "Content-Type": "application/json" } }).then(
      (res) => res.json()
    );
  const { data: projectDetails, error } = useSWR(
    `/api/project/${projectId}`,
    fetcher
  );

  let thisTokenAddress = "0x0000000000000000000000000000000000000000";

  // ** Refresh the variables on load ** //
  useEffect(() => {
    thisTokenAddress =
      projectDetails && projectDetails.project
        ? projectDetails.project[0].token_address
        : "0x0000000000000000000000000000000000000000";
    setGettingPlaced(true);
    setGettingFilled(true);
    setGettingCancelled(true);
    getPlacedOrders();
    getFilledOrders();
    getCancelledOrders();
  }, [projectDetails, openOrders]);

  // ** Set Getting Actions ** //
  useEffect(() => {
    if (!gettingPlaced && !gettingFilled && !gettingCancelled) {
      setGettingActions(false);
    }
  }, [gettingPlaced, gettingFilled, gettingCancelled]);

  // ** Helper function to get the open orders ** //
  const getPlacedOrders = async () => {
    let _placed_orders = [];
    let placedBidValuesForProject = {};
    let totalQty = 0;

    for (const action of actions) {
      try {
        // ** Set the block timestamp **
        let blockNumber = action["blockNumber"];
        // ** Convert block number to date **
        let block = await yobot.web3.eth.getBlock(parseInt(blockNumber));
        // @ts-ignore
        let block_timestamp = parseInt(block.timestamp);
        action["date"] = new Date(block_timestamp * 1000);
      } catch (e) {
        console.error(e);
      }

      // ** Parse the action ** //
      const parsedAction = parseAction(action);

      // ** Extract object entries **
      if (parsedAction && parsedAction.order_id !== "0") {
        // ** For this NFT ** //
        if (
          parsedAction.token_address.toUpperCase() ==
          thisTokenAddress.toUpperCase()
        ) {
          const isCurrUser =
            parsedAction.user.toUpperCase() == address.toUpperCase();
          // @ts-ignore
          const bidPrice = parseFloat(parsedAction.price);
          const qty = parseInt(parsedAction.quantity);

          if (parsedAction.status == "ORDER_PLACED") {
            placedBidValuesForProject[parsedAction.user.toUpperCase()] =
              bidPrice;
            totalQty += qty;
            if (isCurrUser) _placed_orders.push(parsedAction);
          }
        }
      }
    }

    const verifiedOpenOrders = _placed_orders.filter((po) => {
      for (const order of validOrders) {
        if (
          order &&
          po &&
          order.num == po.order_num &&
          order.owner.toUpperCase() === po.user.toUpperCase() &&
          order.tokenAddress.toUpperCase() === po.token_address.toUpperCase()
        ) {
          return true;
        }
      }
    });

    // @ts-ignore
    const highestBidInWei = Math.max(
      ...Object.values(placedBidValuesForProject),
      -1
    );

    // ** Update State ** //
    setPlacedOrders(verifiedOpenOrders);
    setTotalBids((parseInt(totalBids) + totalQty).toString());
    setHighestBidInWei(highestBidInWei.toString());
    setGettingPlaced(false);
  };

  // ** Helper function to get the filled orders ** //
  const getFilledOrders = async () => {
    let filled_orders = [];
    let totalQty = 0;

    for (const action of actions) {
      try {
        // ** Set the block timestamp **
        let blockNumber = action["blockNumber"];
        // ** Convert block number to date **
        let block = await yobot.web3.eth.getBlock(parseInt(blockNumber));
        // @ts-ignore
        let block_timestamp = parseInt(block.timestamp);
        action["date"] = new Date(block_timestamp * 1000);
      } catch (e) {
        console.error(e);
      }

      // ** Parse the action ** //
      const parsedAction = parseAction(action);

      // ** Extract object entries **
      if (parsedAction && parsedAction.order_id !== "0") {
        // ** For this NFT ** //
        if (
          parsedAction.token_address.toUpperCase() ==
          thisTokenAddress.toUpperCase()
        ) {
          const isCurrUser =
            parsedAction.user.toUpperCase() == address.toUpperCase();
          // @ts-ignore
          const bidPrice = parseFloat(parsedAction.price);
          const qty = parseInt(parsedAction.quantity);

          if (parsedAction.status == "ORDER_FILLED") {
            if (isCurrUser) filled_orders.push(parsedAction);
          }
        }
      }
    }

    // ** Update State ** //
    setFilledOrders(filled_orders);
    setTotalBids((parseInt(totalBids) + totalQty).toString());
    setGettingFilled(false);
  };

  // ** Helper function to get the cancelled orders ** //
  const getCancelledOrders = async () => {
    let _cancelled_orders = [];

    for (const action of actions) {
      try {
        // ** Set the block timestamp **
        let blockNumber = action["blockNumber"];
        // ** Convert block number to date **
        let block = await yobot.web3.eth.getBlock(parseInt(blockNumber));
        // @ts-ignore
        let block_timestamp = parseInt(block.timestamp);
        action["date"] = new Date(block_timestamp * 1000);
      } catch (e) {
        console.error(e);
      }

      // ** Parse the action ** //
      const parsedAction = parseAction(action);

      // ** Extract object entries **
      if (parsedAction && parsedAction.order_id !== "0") {
        // ** For this NFT ** //
        if (
          parsedAction.token_address.toUpperCase() ==
          thisTokenAddress.toUpperCase()
        ) {
          const isCurrUser =
            parsedAction.user.toUpperCase() == address.toUpperCase();
          if (parsedAction.status == "ORDER_CANCELLED") {
            if (isCurrUser) _cancelled_orders.push(parsedAction);
          }
        }
      }
    }

    // ** Update State ** //
    setCancelledOrders(_cancelled_orders);
    setGettingCancelled(false);
  };

  const onBidSubmitted = (submitting) => {
    setSubmittingBid(submitting);
  };

  return (
    <div>
      <div className="max-w-screen-lg m-auto mt-2 mt-12 text-gray-300 bg-black xl:max-w-7xl App font-Roboto sm:">
        <div className="pb-6 mx-auto sm:pb-0 flex border border-gray-700 rounded-xl  flex-col-reverse max-w-screen-xl m-auto  bg-gray-800 sm:flex-row sm:mb-4">
          <BidForm
            props={{
              onBidSubmitted,
              tokenAddress: thisTokenAddress,
              mintPrice:
                projectDetails && projectDetails.project[0].mint_price
                  ? projectDetails.project[0].mint_price
                  : "-",
            }}
          />
          <ProjectDetails
            props={{
              project: projectDetails
                ? {
                    ...projectDetails.project[0],
                    totalBids: totalBids,
                    highestBidInWei: highestBidInWei,
                  }
                : {},
              gettingActions: gettingActions,
            }}
          />
        </div>
        <ProjectBidTable
          props={{
            userBids: [...placedOrders, ...filledOrders, ...cancelledOrders],
            gettingActions,
            submittingBid,
            tokenAddress: thisTokenAddress,
          }}
        />
      </div>
    </div>
  );
};

export default BidPageMain;
