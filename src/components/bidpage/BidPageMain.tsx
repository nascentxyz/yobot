import React from "react";
import { useEffect, useState, useRef } from "react";
import { useYobot } from "src/contexts/YobotContext";
import useSWR from "swr";

import ProjectDetails from "./ProjectDetails";
import ProjectBidTable from "./ProjectBidTable";
import BidForm from "./BidForm";
import { filterOrders, parseAction, parseOrders } from "src/contexts/utils";

const BidPageMain = ({ projectId }) => {
  const { yobot, address, chainId, actions, openOrders } = useYobot();
  const tokenAddress = useRef("0x0000000000000000000000000000000000000000");
  const mintPrice = useRef("-");

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

  // ** Refresh the variables on load ** //
  useEffect(() => {
    setGettingPlaced(true);
    setGettingFilled(true);
    setGettingCancelled(true);
    if (projectDetails && projectDetails.project && projectDetails.project[0]) {
      tokenAddress.current = projectDetails.project[0].token_address;
      mintPrice.current = projectDetails.project[0].mint_price;
    }
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

  let placedBidValuesForProject = {};

  // ** Helper function to get the open orders ** //
  const getPlacedOrders = async () => {
    let _placed_orders = [];
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
          tokenAddress.current.toUpperCase()
        ) {
          const isCurrUser =
            parsedAction.user.toUpperCase() == address.toUpperCase();
          // @ts-ignore
          const bidPrice = parseFloat(parsedAction.price);
          const qty = parseInt(parsedAction.quantity);

          if (parsedAction.status == "ORDER_PLACED") {
            if (placedBidValuesForProject[parsedAction.order_id] !== -1) {
              // If this order hasn't already been cancelled
              placedBidValuesForProject[parsedAction.order_id] = bidPrice;
            }
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

    const highestBidInWei = Math.max(
      // @ts-ignore
      ...Object.values(placedBidValuesForProject),
      -1
    );

    // ** Update State ** //
    setPlacedOrders(verifiedOpenOrders);
    setTotalBids((parseInt(totalBids) + totalQty).toString());
    setHighestBidInWei(highestBidInWei > 0 ? highestBidInWei.toString() : "-");
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
          tokenAddress.current.toUpperCase()
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
          tokenAddress.current.toUpperCase()
        ) {
          const isCurrUser =
            parsedAction.user.toUpperCase() == address.toUpperCase();
          if (parsedAction.status == "ORDER_CANCELLED") {
            placedBidValuesForProject[parsedAction.order_id] = -1;
            if (isCurrUser) _cancelled_orders.push(parsedAction);
          }
        }
      }
    }

    // ** Update State ** //

    const highestBidInWei = Math.max(
      // @ts-ignore
      ...Object.values(placedBidValuesForProject),
      -1
    );
    setHighestBidInWei(highestBidInWei > 0 ? highestBidInWei.toString() : "-");
    setCancelledOrders(_cancelled_orders);
    setGettingCancelled(false);
  };

  const onBidSubmitted = (submitting) => {
    setSubmittingBid(submitting);
  };

  return (
    <div>
      <div className="max-w-screen-lg p-2 m-auto mt-12 font-Rubik">
        <div className="flex flex-col-reverse justify-between max-w-screen-xl mx-auto mb-6 border-0 sm:pb-0 rounded-xl sm:flex-row sm:mb-20">
          <BidForm
            props={{
              onBidSubmitted,
              tokenAddress: tokenAddress.current,
              mintPrice: mintPrice.current,
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
            tokenAddress: tokenAddress.current,
          }}
        />
      </div>
    </div>
  );
};

export default BidPageMain;
