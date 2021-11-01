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
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import { useYobot } from "src/contexts/YobotContext";
import { ConnectWallet, NoShadowButton } from "src/components";
import { useTranslation } from "react-i18next";
import {
  onTxSubmitted,
  onTxFailed,
  userRejectedCallback,
  onTxConfirmed,
  getNetworkPrefix,
} from "src/utils";

// TODO: change this - temporary erc721 token address for testing on rinkeby
const TOKEN_ADDRESS = "0xd8bbf8ceb445de814fb47547436b3cfeecadd4ec";

const CancelledBidsFrame = () => {
  const { t } = useTranslation();
  const { yobot, isAuthed, actions, address, chainId } = useYobot();
  const [cancelledOrders, setCancelledOrders] = useState([]);

  const fetchNewCancelledOrders = async () => {
    let _cancelled_orders = [];

    for (const action of actions) {
      // ** Set the block timestamp **
      let blockNumber = action["blockNumber"];
      // ** Convert block number to date **
      let block = await yobot.web3.eth.getBlock(parseInt(blockNumber));
      let block_timestamp: string = block.timestamp.toString();
      action["date"] = new Date(parseInt(block_timestamp) * 1000);

      // ** Extract object entries **
      let values = action["returnValues"];
      let _address = values["0"];
      let _token_address = values["1"];
      let _action = values["4"];

      // ** Check if event Actions is ORDER_CANCELLED
      if (
        _address.toUpperCase() == address.toUpperCase() &&
        _token_address.toUpperCase() == TOKEN_ADDRESS.toUpperCase() &&
        values["4"] == "ORDER_CANCELLED"
      ) {
        _cancelled_orders.push(action);
      }

      // ** Check if event Actions is ORDER_PLACED
      // if (_address.toUpperCase() == address.toUpperCase() &&
      //   _token_address.toUpperCase() == TOKEN_ADDRESS.toUpperCase() &&
      //   values["4"] == "ORDER_PLACED") {
      //     // ** Iterate over _cancelled_orders and try to add
      //     for (let i = _cancelled_orders.length - 1; i >= 0; --i) {
      //       if (
      //         _cancelled_orders[i]["returnValues"]["0"].toUpperCase() == address.toUpperCase() &&
      //         _cancelled_orders[i]["returnValues"]["1"].toUpperCase() == TOKEN_ADDRESS.toUpperCase()
      //       ) {
      //         _cancelled_orders.splice(i, 1); // Remove even numbers
      //       }
      //   }
      // }
    }

    setCancelledOrders(_cancelled_orders);
  };

  // ** On actions refresh, filter and set a user's actions **
  useEffect(() => {
    fetchNewCancelledOrders();
  }, [actions]);

  return (
    <BidBox>
      <CancelBidText>{t("Cancelled Bids")}</CancelBidText>
      <CustomTable size="sm">
        <Thead>
          <Tr>
            <Th>{t("")}</Th>
            <Th>{t("Date")}</Th>
            <Th>{t("Token Address")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cancelledOrders.length > 0 ? (
            cancelledOrders.map((order) => {
              let action = order["returnValues"];
              let date = "ORDER_DATE";
              let _token_address = "";
              if (action) {
                date = order["date"];
                _token_address = action["_tokenAddress"];
              }

              return (
                <Tr key={Object.entries(order).toString()}>
                  <Td width="20px">
                    <CloseIcon w={4} h={4} color="red.700" />
                  </Td>
                  <Td>{date.toLocaleString().toString()}</Td>
                  <Td>
                    <Stack direction="row">
                      <ChakraLink
                        display="flex"
                        mr="0.2em"
                        color="blue.400"
                        isExternal
                        href={`https://${
                          chainId > 0 ? getNetworkPrefix(chainId) : ""
                        }etherscan.io/address/${_token_address}`}
                      >
                        {_token_address}
                        <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                          <ExternalLinkIcon />
                        </span>
                      </ChakraLink>
                    </Stack>
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr p="1em">
              <Text padding="1em" marginLeft="1em" align="start">
                {t("No cancelled bids")}
              </Text>
              {/* <Td>{""}</Td>
              <Td>
              </Td> */}
            </Tr>
          )}
        </Tbody>
      </CustomTable>
    </BidBox>
  );
};

const CancelOrderButton = styled(Button)`
  width: 100%;
  max-width: 150px;
  margin-left: auto;
  margin-right: 0;

  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
`;

const BidBox = styled.div`
  min-width: 480px;
  height: auto;
  width: 100%;
  margin: 2em auto auto 0;
  padding: 1em;
  border-radius: 24px;
  background-color: #191b1f;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CancelBidText = styled.p`
  height: auto;
  margin: 0 auto 0 0.2em;
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding-bottom: 1em;
`;

const DataFormText = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const HeaderText = styled.p`
  height: auto;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

const CustomTable = styled(Table)`
  width: 100%;
  height: auto;
  margin: auto;
  border-radius: 1em;
  border: solid 1px #2c2f36;
  background-color: #212429;

  border-collapse: collapse;
  border-radius: 10px;
  border-style: hidden; /* hide standard table (collapsed) border */
  box-shadow: 0 0 0 1px var(--chakra-colors-gray-700); /* this draws the table border  */
`;

export default CancelledBidsFrame;
