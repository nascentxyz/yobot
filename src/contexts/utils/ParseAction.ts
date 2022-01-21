import web3 from "web3";

const parseAction = (action) => {
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };

  // ** Extract the Log Return Values ** //
  let returnValues = action["returnValues"];

  // ** Return the Parsed Action ** //
  return {
    status: returnValues ? returnValues["_action"] : "",
    order_id: returnValues ? returnValues["_orderId"] : "",
    order_num: returnValues ? returnValues["_orderNum"] : "",
    price: returnValues ? web3.utils.fromWei(
      returnValues["_priceInWeiEach"],
      "ether"
    ) : 0,
    quantity: returnValues ? returnValues["_quantity"] : "0",
    token_address: returnValues ? returnValues["_tokenAddress"] : "",
    token_id: returnValues ? returnValues["_tokenId"] : "",
    user: returnValues ? returnValues["_user"] : "",
    date_time: action["date"].toLocaleDateString("en-US", options),
    date_year: action["date"].getFullYear().toString(),
  }
}

export default parseAction;