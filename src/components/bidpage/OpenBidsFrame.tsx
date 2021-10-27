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
} from "@chakra-ui/react";
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

const OpenBidsFrame = () => {
  const { t } = useTranslation();
  const { yobot, isAuthed, actions, address } = useYobot();
  const [myOrders, setMyOrders] = useState([{}]);
  const [cancellingOrder, setCancellingOrder] = useState(false);

  const fetchNewOrders = async () => {
    let new_actions = [];
    for (const action in actions) {
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

      // ** Check if event Actions is ORDER_PLACED
      if (
        _address.toUpperCase() == address.toUpperCase() &&
        _token_address.toUpperCase() == TOKEN_ADDRESS.toUpperCase() &&
        values["4"] == "ORDER_PLACED"
      ) {
        new_actions.push(action);
      }

      // ** Check if event Actions is ORDER_CANCELLED
      if (
        _address.toUpperCase() == address.toUpperCase() &&
        _token_address.toUpperCase() == TOKEN_ADDRESS.toUpperCase() &&
        values["4"] == "ORDER_CANCELLED"
      ) {
        // ** Iterate over new_actions and try to remove cancelled order **
        for (let i = new_actions.length - 1; i >= 0; --i) {
          if (
            new_actions[i]["returnValues"]["0"].toUpperCase() ==
              address.toUpperCase() &&
            new_actions[i]["returnValues"]["1"].toUpperCase() ==
              TOKEN_ADDRESS.toUpperCase()
          ) {
            new_actions.splice(i, 1); // Remove even numbers
          }
        }
      }
    };
    
    setMyOrders(new_actions);
  }

  // ** On actions refresh, filter and set a user's actions **
  useEffect(() => {
    fetchNewOrders();
  }, [actions]);

  const cancelOrder = async () => {
    console.log("cancelling order...");
    setCancellingOrder(true);

    // TODO: depending on the erc721 - art blocks or general - this should change
    let cancelOrderTx = await yobot.YobotERC721LimitOrder.cancelOrder(
      yobot.web3, // web3
      yobot.YobotERC721LimitOrder.YobotERC721LimitOrder, // yobotERC721LimitOrder
      // TODO: dynamically pull token address from query string parameters
      // tokenAddress, // tokenAddress
      TOKEN_ADDRESS,
      address, // sender
      async () => {
        onTxSubmitted();
        setCancellingOrder(false);
      }, // txSubmitCallback
      async () => {
        onTxFailed();
        setCancellingOrder(false);
      }, // txFailCallback
      async (msg) => {
        // txFailCallback
        onTxConfirmed(msg);
        setCancellingOrder(false);
      },
      async () => {
        userRejectedCallback();
        setCancellingOrder(false);
      } // userRejectedCallback
    );
    console.log("cancel order tx:", cancelOrderTx);
  };

  return (
    <BidBox>
      <PlaceBidText>{t("Open Bids")}</PlaceBidText>
      {/* <DataFormText>
        <HeaderText>{t("Date")}</HeaderText>
        <HeaderText>{t("Quantity")}</HeaderText>
        <HeaderText>{t("Total")}</HeaderText>
        <HeaderText>{t("")}</HeaderText>
      </DataFormText> */}
      <CustomTable size="sm">
        <Thead>
          <Tr>
            <Th>{t("Date")}</Th>
            <Th isNumeric>{t("Quantity")}</Th>
            <Th>{t("Price")}</Th>
            <Th>{t("")}</Th> {/* Empty column for cancel buttons */}
          </Tr>
        </Thead>
        <Tbody>
          {myOrders.length > 0 ? (
            myOrders.map((order) => {
              let action = order["returnValues"];
              let date = "ORDER_DATE";
              let quantity = "";
              let price = "";
              if (action) {
                date = order["date"];
                quantity = action["_quantity"];
                // ** Convert from Wei to Ethers **
                price = yobot.web3.utils.fromWei(
                  action["_priceInWeiEach"],
                  "ether"
                );
              }

              return (
                <Tr key={Object.entries(order).toString()}>
                  <Td>{date.toString()}</Td>
                  <Td isNumeric>{quantity}</Td>
                  <Td>{price}</Td>
                  <Td>
                    <CancelOrderButton
                      disabled={cancellingOrder}
                      colorScheme={"red"}
                      background={"red.800"}
                      _hover={{
                        backgroundColor: "red.900",
                      }}
                      color={"red.100"}
                      variant={"outline"}
                      onClick={cancelOrder}
                      display={"flex"}
                    >
                      {!cancellingOrder ? (
                        <>{t("Cancel Order")}</>
                      ) : (
                        <Spinner margin={"auto"} color={"red.400"} />
                      )}
                    </CancelOrderButton>
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr p="1em">
              <Td>{""}</Td>
              <Td>
                <Text padding="1em" align="center">
                  {t("You've placed no orders...")}
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

export default OpenBidsFrame;
