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

const OpenBidsFrame = () => {
  const { t } = useTranslation();
  const { yobot, isAuthed, actions, address } = useYobot();
  const [myOrders, setMyOrders] = useState([{}]);
  const [cancellingOrder, setCancellingOrder] = useState(false);

  // ** On actions refresh, filter and set a user's actions **
  useEffect(() => {
    console.log("got actions:", actions);
    setMyOrders(
      actions.filter((action) => {
        // TODO
      })
    );
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
      "0xd8bbf8ceb445de814fb47547436b3cfeecadd4ec",
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
          {myOrders.length > 0 ? myOrders.map((order) => {
            let date = "ORDER_DATE";
            let quantity = "ORDER_QUANTITY";
            let price = "ORDER_PRICE";

            return (
              <Tr key={Object.entries(order).toString()}>
                <Td>{date}</Td>
                <Td isNumeric>{quantity}</Td>
                <Td>{price}</Td>
                <Td>
                  <CancelOrderButton
                    disabled={cancellingOrder}
                    colorScheme={"red"}
                    background={"red.800"}
                    // _hover={
                    //   color: "white.900",
                    //   border: "0.4px",
                    //   borderStyle: "solid",
                    //   borderColor: "white.900",
                    //   backgroundColor: "green.500",
                    // }
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
          }) : (
            <Tr p="1em">
              <Td>{""}</Td>
              <Td>
                <Text padding="1em" align="center">{t("You've placed no orders...")}</Text>
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
  margin: auto;

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
  border-radius: 30px;
  border-style: hidden; /* hide standard table (collapsed) border */
  box-shadow: 0 0 0 1px var(--chakra-colors-gray-700); /* this draws the table border  */ 
`;

export default OpenBidsFrame;
