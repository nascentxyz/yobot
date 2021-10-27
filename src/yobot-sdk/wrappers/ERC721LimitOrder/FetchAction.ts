import Web3 from "web3";

// ** Fetch indexed Action events **
const fetchAction = async (
  web3: Web3,
  yobotERC721LimitOrder: any
  // tokenAddress: string,
  // sender: string
) => {
  console.log("In fetchAction function...");

  if (yobotERC721LimitOrder && yobotERC721LimitOrder.options.address) {
    console.log(
      "Using contract with address:",
      yobotERC721LimitOrder.options.address
    );
    // ** Extract cancelOrder method from the YobotERC721LimitOrder Contract **
    let fetchedEvents = await yobotERC721LimitOrder.getPastEvents(
      "Action",
      {
        // filter: {value: [117,50]},
        fromBlock: 0,
        toBlock: "latest",
      },
      (errors, events) => {
        if (!errors) {
          console.log("in callback, got events:", events);
          return events;
        } else {
          console.log("in callback got errors:", errors);
        }
      }
      // {
      // {filter: {myNumber: [12,13]}}
      // fromBlock: 0
      // toBlock: 0
      // topics: Array
      // }
    );

    console.log("Got all events:", fetchedEvents);

    return fetchedEvents;
  }

  // ** Otherwise, empty result **
  return [];
};

export default fetchAction;
