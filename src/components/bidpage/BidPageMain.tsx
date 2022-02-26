import React from "react";
import { useEffect, useState, useRef } from "react";
import { EmptyAddress, useYobot } from "src/contexts/YobotContext";
import useSWR from "swr";

import ProjectDetails from "./ProjectDetails";
import ProjectBidTable from "./ProjectBidTable";
import BidForm from "./BidForm";
import { filterOrders, parseAction, parseOrders } from "src/contexts/utils";

export enum OrderStatus {
  Placed,
  Partially_Filled,
  Filled,
  Cancelled,
}

const BidPageMain = ({ projectId }) => {
  const { yobot, address, chainId, actions, openOrders } = useYobot();
  const tokenAddress = useRef("0x0000000000000000000000000000000000000000");
  const mintPrice = useRef("-");

  // ** State ** //
  const [orders, setOrders] = useState([]);

  // const [placedOrders, setPlacedOrders] = useState([]);
  const [gettingPlaced, setGettingPlaced] = useState(true);

  // const [filledOrders, setFilledOrders] = useState([]);
  const [gettingFilled, setGettingFilled] = useState(true);

  // const [cancelledOrders, setCancelledOrders] = useState([]);
  const [gettingCancelled, setGettingCancelled] = useState(true);

  const [gettingActions, setGettingActions] = useState(true);

  const totalPlacedBids = useRef(0);
  const totalFilledBids = useRef(0);
  const totalCancelledBids = useRef(0);

  // ** Cumulative State ** //
  const currUserOrdersMap = useRef({});
  const [totalBids, setTotalBids] = useState(-1);
  const [highestBid, setHighestBid] = useState(-1);
  const [submittingBid, setSubmittingBid] = useState(false);

  // ** Filter for valid open orders ** //
  const parsedOrders = parseOrders(openOrders);
  const validOrders = filterOrders(parsedOrders);

  // ** Use SWR to load project ** //
  const fetcher = (url) =>
    fetch(url, { headers: { "Content-Type": "application/json" } }).then(
      (res) => res.json()
    );
  const { data: projectDetails } = useSWR(`/api/project/${projectId}`, fetcher);

  // ** Refresh the variables on load ** //
  useEffect(() => {
    setGettingActions(true);
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
      setOrders(Object.values(currUserOrdersMap.current));
      console.log(
        "total bids",
        totalPlacedBids.current -
          totalFilledBids.current -
          totalCancelledBids.current
      );
      setTotalBids(
        totalPlacedBids.current -
          totalFilledBids.current -
          totalCancelledBids.current
      ); // total count of open bids only
      setGettingActions(false);
    }
  }, [gettingPlaced, gettingFilled, gettingCancelled]);

  let openBidPricesForProject = {};
  let openBidQtyForProject = {};

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
          const orderNum = parseInt(parsedAction.order_num);

          if (parsedAction.status == "ORDER_PLACED") {
            console.log(parsedAction);
            if (openBidPricesForProject[parsedAction.order_id] !== -1) {
              // If this order hasn't already been cancelled
              openBidPricesForProject[parsedAction.order_id] = bidPrice;
              openBidQtyForProject[parsedAction.order_id] = qty;
              totalQty += qty;
            }
            if (isCurrUser) {
              currUserOrdersMap.current[orderNum] = {
                placed_time: parsedAction.date_time,
                placed_year: parsedAction.date_year,
                order_id: parsedAction.order_id,
                price: bidPrice,
                remaining_qty: qty,
                orig_qty: qty,
                token_address: parsedAction.token_address,
                token_id: parsedAction.token_id,
                place_tx_hash: parsedAction.tx_hash,
                fill_tx_hash: EmptyAddress,
                cancel_tx_hash: EmptyAddress,
                status: OrderStatus.Placed,
              };
            }
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

    const highestBid = Math.max(
      // @ts-ignore
      ...Object.values(openBidPricesForProject),
      -1
    );

    // ** Update State ** //
    // setPlacedOrders(verifiedOpenOrders);
    totalPlacedBids.current = totalQty;
    console.log(totalQty);
    if (highestBid >= 0) setHighestBid(highestBid);
    setGettingPlaced(false);
  };

  // ** Helper function to get the filled orders ** //
  const getFilledOrders = async () => {
    let filled_orders = [];
    let totalFilledQty = 0;

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
          if (parsedAction.status == "ORDER_FILLED") {
            const isCurrUser =
              parsedAction.user.toUpperCase() == address.toUpperCase();
            const remainingQty = parseInt(parsedAction.quantity);
            openBidQtyForProject[parsedAction.order_id] -= 1;
            totalFilledQty += 1;
            const orderNum = parseInt(parsedAction.order_num);
            if (isCurrUser) {
              const order = currUserOrdersMap.current[orderNum];
              order.remaining_qty = remainingQty;
              // FIXME: if order is filled by multiple bots in multiple txs, this only displays one of them
              order.fill_tx_hash = parsedAction.tx_hash;
              order.status =
                remainingQty > 0
                  ? OrderStatus.Partially_Filled
                  : OrderStatus.Filled;
            }
          }
        }
      }
    }

    // ** Update State ** //
    totalFilledBids.current = totalFilledQty;
    // setFilledOrders(filled_orders);
    setGettingFilled(false);
  };

  // ** Helper function to get the cancelled orders ** //
  const getCancelledOrders = async () => {
    let _cancelled_orders = [];
    let totalCancelledQty = 0;

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
          if (parsedAction.status == "ORDER_CANCELLED") {
            openBidPricesForProject[parsedAction.order_id] = -1;
            totalCancelledQty += openBidQtyForProject[parsedAction.order_id];

            const orderNum = parseInt(parsedAction.order_num);
            const isCurrUser =
              parsedAction.user.toUpperCase() == address.toUpperCase();
            if (isCurrUser) {
              // _cancelled_orders.push(parsedAction);
              const order = currUserOrdersMap.current[orderNum];
              order.status = OrderStatus.Cancelled;
              order.cancel_tx_hash = parsedAction.tx_hash;
            }
          }
        }
      }
    }

    // ** Update State ** //
    // setCancelledOrders(_cancelled_orders);
    totalCancelledBids.current = totalCancelledQty;
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
                    highestBid: highestBid,
                  }
                : {},
              gettingActions: gettingActions,
            }}
          />
        </div>
        <ProjectBidTable
          props={{
            userBids: Object.values(currUserOrdersMap.current),
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
