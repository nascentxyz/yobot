import React from "react";
import { useEffect, useState } from "react";
import { useYobot } from "src/contexts/YobotContext";

import ProjectDetails from "./ProjectDetails";
import ProjectBidTable from "./ProjectBidTable";
import BidForm from "./BidForm";

// TODO: change this - temporary erc721 token address for testing on rinkeby
const TOKEN_ADDRESS = "0xd8bbf8ceb445de814fb47547436b3cfeecadd4ec";
const EmptyAddress = "0x0000000000000000000000000000000000000000";

const BidPageMain = ({ projectId }) => {
  const { yobot, address, chainId, actions } = useYobot();

  const [userBids, setUserBids] = useState(null);
  const [totalBids, setTotalBids] = useState("-");
  const [highestBidInWei, setHighestBidInWei] = useState("-");
  const [gettingActions, setGettingActions] = useState(true);

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

      // ** Extract object entries **
      let values = action["returnValues"];
      if (values !== undefined) {
        let _address = values["0"];
        let _token_address = values["1"];
        let _action_taken = values["4"];

        // orders[msg.sender][_tokenAddress];
        // for all orders for this token address, add qty

        // TODO: implement orderID so easier to lookup orders to update order status & get stats... Otherwise need to loop thru all txs

        // For this NFT contract,
        if (_token_address.toUpperCase() == TOKEN_ADDRESS.toUpperCase()) {
          const isCurrUser = _address.toUpperCase() == address.toUpperCase();
          const bidPrice = values["_priceInWeiEach"];
          const qty = parseInt(values["_quantity"]);

          if (_action_taken == "ORDER_PLACED") {
            placedBidValuesForProject[_address] = bidPrice;
            placedBidQtyForProject[_address] = qty;
            totalQty += qty;

            if (isCurrUser) _placed_orders.push(action);
          } else if (_action_taken == "ORDER_FILLED") {
            // TODO: should highestBid & totalQty stats include FILLED orders? Yes; but stats calc already done when order placed

            // If filled, remove from PLACED orders array
            delete placedBidValuesForProject[_address];
            delete placedBidQtyForProject[_address];

            if (isCurrUser) _successful_orders.push(action);
          } else if (_action_taken == "ORDER_CANCELLED") {
            totalQty -= placedBidQtyForProject[_address];
            delete placedBidValuesForProject[_address];
            delete placedBidQtyForProject[_address];

            // ** Iterate over new_actions and try to remove cancelled order from current users' bid table **
            if (isCurrUser) {
              for (let i = _placed_orders.length - 1; i >= 0; --i) {
                const potentiallyCancelledOrder = _placed_orders[i];
                const orderValues = potentiallyCancelledOrder["returnValues"];
                if (
                  orderValues["0"].toUpperCase() == address.toUpperCase() &&
                  orderValues["1"].toUpperCase() == TOKEN_ADDRESS.toUpperCase()
                ) {
                  // Set cancelled action date-placed, price, quantity for bid table display
                  action["date"] = potentiallyCancelledOrder["date"];
                  values["_priceInWeiEach"] = orderValues["_priceInWeiEach"];
                  values["_quantity"] = orderValues["_quantity"];

                  // Remove even numbers from _placed_orders array
                  _placed_orders.splice(i, 1);
                }
              }
              _cancelled_orders.push(action);
            }
          }
        }
      }
    }
    const user_orders = _placed_orders.concat(
      _successful_orders,
      _cancelled_orders.reverse()
    );

    const highestBidInWei = Math.max(
      highestFilledBidInWei,
      Math.max(...Object.values(placedBidValuesForProject))
    );

    return {
      user_orders,
      totalQty,
      highestBidInWei,
    };
  };

  // Memoize fetchOrders result; don't recalculate unless user changes wallet or chain
  useEffect(() => {
    let active = true;
    setGettingActions(true);
    load();
    return () => {
      // setGettingActions(false);
      active = false;
    };

    async function load() {
      const { user_orders, totalQty, highestBidInWei } =
        await fetchUserOrdersAndTotalStats();

      if (!active) {
        return;
      }

      if (address == EmptyAddress) {
        setTotalBids("-");
        setHighestBidInWei("-");
      } else {
        setTotalBids(totalQty);
        setHighestBidInWei(highestBidInWei);
      }
      setUserBids(user_orders);
      setGettingActions(false);
    }
  }, [chainId, address]);

  // FIXME
  function getProjectDetailsFromId(pid) {
    const projectDetails = {
      projectId: "0",
      title: "Art Blocks",
      projectWebsite: "https://www.artblocks.io/",
      description:
        "Art Blocks is a first of its kind platform focused on genuinely programmable on demand generative content that is stored immutably on the Ethereum Blockchain.",
      launchTime: new Date("December 31, 2021 23:59:59 PST"),
      previewImageSrc:
        "https://www.artblocks.io/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fsquig_0_transparent.11e0ba7d94e0dcfd0d0a9fcdbc26e7fe.png&w=640&q=75",
      projectTokenAddress: "0xd8bbf8ceb445de814fb47547436b3cfeecadd4ec",
      totalBids: totalBids,
      highestBidInWei: highestBidInWei,
    };
    return projectDetails;
  }

  return (
    <div>
      <div className="max-w-screen-lg m-auto mt-2 mt-12 text-gray-300 bg-black xl:max-w-7xl App font-Roboto sm:">
        <div className="pb-6 mx-auto sm:pb-0 flex border border-gray-700 rounded-xl  flex-col-reverse max-w-screen-xl m-auto  bg-gray-800 sm:flex-row sm:mb-4">
          <BidForm />
          <ProjectDetails
            props={{
              project: getProjectDetailsFromId(projectId),
              gettingActions: gettingActions,
            }}
          />
        </div>
        <ProjectBidTable props={{ userBids, gettingActions }} />
      </div>
    </div>
  );
};

export default BidPageMain;
