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
  Flex
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import { useYobot } from "src/contexts/YobotContext";
import { ConnectWallet, NoShadowButton } from "src/components";
import { useTranslation } from "react-i18next";
import {
  onTxSubmitted,
  onTxFailed,
  userRejectedCallback,
  onTxConfirmed,
} from "src/utils";

// TODO: change this - temporary erc721 token address for testing on rinkeby
const TOKEN_ADDRESS = "0xd8bbf8ceb445de814fb47547436b3cfeecadd4ec";

const CancelledBidsFrame = () => {
  const { t } = useTranslation();
  const { yobot, isAuthed, actions, address } = useYobot();
  const [cancelledOrders, setCancelledOrders] = useState([]);

  const fetchNewCancelledOrders = async () => {
    let _cancelled_orders = [];

    for (const action of actions) {
      // ** Set the block timestamp **
      let blockNumber = action["blockNumber"];
      // ** Convert block number to date **
      console.log("got block number:", blockNumber)
      let block = await yobot.web3.eth.getBlock(parseInt(blockNumber));
      console.log("got block number as a timestamp:", block.timestamp);
      action["date"] = new Date(block.timestamp * 1000);

      // ** Extract object entries **
      let values = action["returnValues"];
      let _address = values["0"];
      let _token_address = values["1"];
      let _action = values["4"];
      
      // ** Check if event Actions is ORDER_CANCELLED
      if (_address.toUpperCase() == address.toUpperCase() &&
        _token_address.toUpperCase() == TOKEN_ADDRESS.toUpperCase() &&
        values["4"] == "ORDER_CANCELLED") {
          console.log("pushing cancelled order:", action);
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
    };

    setCancelledOrders(_cancelled_orders);
  }

  // ** On actions refresh, filter and set a user's actions **
  useEffect(() => {
    fetchNewCancelledOrders();
  }, [actions]);

  return (
    <BidBox>
      <PlaceBidText>{t("Cancelled Orders")}</PlaceBidText>
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
                  <Td>{_token_address}</Td>
                </Tr>
              );
            })
          ) : (
            <Tr p="1em">
              <Td>{""}</Td>
              <Td>
                <Text padding="1em" align="center">
                  {t("No cancelled orders :)")}
                </Text>
              </Td>
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

const PlaceBidText = styled.p`
  height: auto;
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
