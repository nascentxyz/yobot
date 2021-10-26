import { useEffect, useState } from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useYobot } from "src/contexts/YobotContext";
import { ConnectWallet, NoShadowButton } from "src/components";
import { useTranslation } from "react-i18next";

const OpenBidsFrame = () => {
  const { t } = useTranslation();
  const { yobot, isAuthed, openOrders, fetchOpenOrders } = useYobot();

  // ** On component render, fetch a user's current open orders
  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  const cancelBid = () => {
    console.log("cancelling bid...");

    // TODO: depending on the erc721 - art blocks or general - this should change
    let cancelBidTx = await yobot.YobotERC721LimitOrder.cancelOrder(
      yobot.web3, // web3
      yobot.yobotERC721LimitOrder, // yobotERC721LimitOrder
      tokenAddress, // tokenAddress
      address, // sender
      onTxSubmitted, // txSubmitCallback
      onTxFailed, // txFailCallback
      async (msg) => {
        // txFailCallback
        onTxConfirmed(msg);
      },
      userRejectedCallback // userRejectedCallback
    );
    console.log("cancel bid tx:", cancelBidTx);
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
            <Th>{t("Total")}</Th>
            <Th>{t("")}</Th> {/* Empty column for cancel buttons */}
          </Tr>
        </Thead>
        <Tbody>
          {}
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
      </CustomTable>
    </BidBox>
  );
};

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
  // margin: auto;
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
  // margin: auto;
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
`;

export default OpenBidsFrame;
