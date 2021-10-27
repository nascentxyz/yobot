import Web3 from "web3";

// ** Fetch indexed Action events **
const fetchAction = async (
  web3: Web3,
  yobotERC721LimitOrder: any
  // tokenAddress: string,
  // sender: string
) => {
  console.log("In fetchAction function...");

  // ** ERC721 Token Address must be valid **
  // if (!tokenAddress) throw new Error("Invalid ERC721 Token address!");

  if (yobotERC721LimitOrder && yobotERC721LimitOrder.options.address) {
    console.log(
      "Using contract with address:",
      yobotERC721LimitOrder.options.address
    );
    // ** Extract cancelOrder method from the YobotERC721LimitOrder Contract **
    let fetchedEvents = await yobotERC721LimitOrder.getPastEvents("Action", {
      // {filter: {myNumber: [12,13]}}
      // fromBlock: 0
      // toBlock: 0
      // topics: Array
    });

    console.log("Got all events:", fetchedEvents);

    return fetchedEvents;
  } else {
    console.log("no address set... returning empty actions array")
  }

  console.log("returning empty array from fetchAction")

  // ** Otherwise, empty result **
  return [];
};

export default fetchAction;
