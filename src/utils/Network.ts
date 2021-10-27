
const getNetworkPrefix = (chainId: number) => {
  let prefix = "";
  switch(chainId) {
    case 5:
      prefix = "goerli."
      break;
    case 4:
      prefix = "rinkeby."
      break;
    default:
      prefix = ""
  }

  return prefix;
}

export default getNetworkPrefix;