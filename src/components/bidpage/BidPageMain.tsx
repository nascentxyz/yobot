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

  // ** Filter for valid open orders ** //
  console.log("open orders:", openOrders);
  const parsedOrders = parseOrders(openOrders);
  console.log("parsed orders:", parsedOrders);
  const validOrders = filterOrders(parsedOrders);
  // const filteredOrderNums = validOrders.map(order => order.orderNum);

  // ** Use SWR to load project ** //
  const fetcher = (url) =>
    fetch(url, { headers: { "Content-Type": "application/json" } }).then(
      (res) => res.json()
    );
  const { data: projectDetails, error } = useSWR(
    `/api/project/${projectId}`,
    fetcher
  );
  let thisTokenAddress = projectDetails && projectDetails.project ? projectDetails.project[0].token_address : null;

  const [userBids, setUserBids] = useState(null);
  const [totalBids, setTotalBids] = useState("-");
  const [highestBidInWei, setHighestBidInWei] = useState("-");
  const [gettingActions, setGettingActions] = useState(true);
  const [submittingBid, setSubmittingBid] = useState(false);
  const [alreadyPlacedBid, setAlreadyPlacedBid] = useState(false);

  const fetchUserOrdersAndTotalStats = async () => {
    let _placed_orders = [];
    let _successful_orders = [];
    let _cancelled_orders = [];

    let placedBidValuesForProject = {};
    let placedBidQtyForProject = {};
    let highestFilledBidInWei = 0;
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
      let values = action["returnValues"];
      if (values !== undefined) {
        let _address = values["0"];
        let _token_address = values["1"];
        let _action_taken = values["4"];

        // ** For this NFT ** //
        if (_token_address.toUpperCase() == thisTokenAddress.toUpperCase()) {
          const isCurrUser = _address.toUpperCase() == address.toUpperCase();
          const bidPrice = values["_priceInWeiEach"];
          const qty = parseInt(values["_quantity"]);

          if (_action_taken == "ORDER_PLACED") {
            placedBidValuesForProject[_address] = bidPrice;
            placedBidQtyForProject[_address] += qty;
            totalQty += qty;
            if (isCurrUser) _placed_orders.push(parsedAction);
          } else if (_action_taken == "ORDER_FILLED") {
            placedBidValuesForProject[_address] -= bidPrice;
            placedBidQtyForProject[_address] -= qty;
            if (isCurrUser) _successful_orders.push(parsedAction);
          } else if (_action_taken == "ORDER_CANCELLED") {
            totalQty -= qty;
            placedBidValuesForProject[_address] -= bidPrice;
            placedBidQtyForProject[_address] -= qty;
            if (isCurrUser) _cancelled_orders.push(parsedAction);
          }
        }
      }
    }

    console.log("Placed orders: ", _placed_orders);
    console.log("valid orders: ", validOrders);

    // ** Verify that the placed orders from the action are actually open orders ** //
    const verifiedOpenOrders = _placed_orders.filter((po) => {
      for (const order of validOrders) {
        if (
          order.orderNum == po.orderNum
          && order.owner.toUpperCase() === po.user.toUpperCase()
          && order.tokenAddress.toUpperCase() === po.tokenAddress.toUpperCase()
        ) {
          return true;
        };
      }
    });

    // ** Create a full list of orders ** //
    const user_orders = verifiedOpenOrders.concat(
      _successful_orders,
      _cancelled_orders.reverse()
    );

    setAlreadyPlacedBid(_placed_orders.length > 0);

    const highestBidInWei = Math.max(
      highestFilledBidInWei,
      Math.max(...Object.values(placedBidValuesForProject))
    );

    setTotalBids(totalQty.toString());
    setHighestBidInWei(highestBidInWei.toString());
    setUserBids(user_orders);

    setGettingActions(false);

    return {
      user_orders,
      totalQty,
      highestBidInWei,
    };
  };

  // Memoize fetchOrders result; don't recalculate unless user changes wallet or chain
  useEffect(() => {
    let active = true;
    setTotalBids("-");
    setHighestBidInWei("-");
    setGettingActions(true);
    load();
    return () => {
      active = false;
    };

    async function load() {
      const { user_orders, totalQty, highestBidInWei } =
        await fetchUserOrdersAndTotalStats();

      if (!active) {
        return;
      }
    }
  }, [actions, chainId, address]);

  const onBidSubmitted = (submitting) => {
    setSubmittingBid(submitting);
  };

  return (
    <div>
      <div className="max-w-screen-lg m-auto mt-2 mt-12 text-gray-300 bg-black xl:max-w-7xl App font-Roboto sm:">
        <div className="pb-6 mx-auto sm:pb-0 flex border border-gray-700 rounded-xl  flex-col-reverse max-w-screen-xl m-auto  bg-gray-800 sm:flex-row sm:mb-4">
          <BidForm
            props={{
              alreadyPlacedBid,
              onBidSubmitted,
              tokenAddress:
                projectDetails && projectDetails.token_address
                  ? projectDetails.project[0].token_address
                  : "0x0000000000000000000000000000000000000000",
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
            userBids,
            gettingActions,
            submittingBid,
            tokenAddress:
              projectDetails && projectDetails.token_address
                ? projectDetails.token_address
                : "0x0000000000000000000000000000000000000000",
          }}
        />
      </div>
    </div>
  );
};

export default BidPageMain;
