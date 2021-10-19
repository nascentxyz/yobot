import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useYobot } from "src/contexts/YobotContext";
import { ConnectWallet } from ".";

const BidBox = styled.div`
  min-width: 480px;
  min-height: 350px;
  height: auto;
  margin: auto auto auto 0;
  padding: 1em;
  border-radius: 24px;
  background-color: #191b1f;
  display: flex;
  flex-direction: column;
`;

const PlaceBidText = styled.p`
  height: auto;
  margin: 0.5em auto 0 0;
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

const DataForm = styled.div`
  padding-top: 1em;
  padding-bottom: 2em;
  display: flex;
  flex-direction: column;
`;

const PriceText = styled.p`
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

const PriceSubText = styled.p`
  height: auto;
  padding: 0.2em 0 0.4em 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: normal;
  text-align: left;
  color: #95969a;
`;

const CustomInput = styled(Input)`
  width: 100%;
  height: auto;
  min-height: 48px;
  margin: auto;
  border-radius: 1em;
  border: solid 1px #2c2f36;
  background-color: #212429;
`;

const QuantityText = styled.p`
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
  padding-top: 1em;
`;

const ButtonWrapper = styled.div`
  padding-bottom: 1em;
  margin-top: auto;
  display: flex;
`;

const PlaceBidButton = styled(Button)`
  width: 100%;
  // max-width: 200px;
  margin: auto;
`;

const Row = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: space-between;
`;

const GasText = styled.p`
  height: auto;
  padding: 0.2em 0 0.4em 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  // line-height: 1.07;
  letter-spacing: normal;
  text-align: left;
  color: #95969a;
`;

const PlaceBidFrame = () => {
  const { isAuthed } = useYobot();
  const [validParams, setValidParams] = useState(false);

  // ** Bid Inputs **
  const [bidPrice, setBidPrice] = useState(0.0);
  const [bidQty, setBidQty] = useState(0);

  // ** Gas Estimates **
  // TODO: fetch these predicted fees every x time
  // ?? use previous bids to predict new fees ??
  const [lowGasFee, setLowGasFee] = useState(0);
  const [mediumGasFee, setMediumGasFee] = useState(0);
  const [highGasFee, setHighGasFee] = useState(0);

  // ** Helper function to fetch gas timeouts **
  const updateGasEstimates = () => {
    // TODO::::
    console.log("updating gas estimates...")
  }

  // ** Every 15 seconds, update gas estimates **
  useEffect(() => {
    let gasTimer = setTimeout(() => updateGasEstimates(), 15 * 1000);
    return () => {
      clearTimeout(gasTimer);
    };
  }, [])

  return (
    <BidBox>
      <PlaceBidText>Place Bid</PlaceBidText>
      <DataForm>
        <PriceText>Price per NFT (ETH)</PriceText>
        <PriceSubText>Include gas fees in your bid price. Higher bids will be filled first!</PriceSubText>
        <CustomInput
          type="number"
          min={0}
          value={bidPrice}
          onChange={(e) => setBidPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
          placeholder="0.00"
          size="lg"
        />
        <Row>
          <GasText>Low: {lowGasFee}</GasText>
          <GasText>Medium: {mediumGasFee}</GasText>
          <GasText>High: {highGasFee}</GasText>
        </Row>
        <QuantityText>Quantity</QuantityText>
        <CustomInput
          type="number"
          min={1}
          // ?? can we set a max based on mint count dynamically ??
          value={bidQty}
          onChange={(e) => setBidQty(e.target.value ? parseInt(e.target.value) : undefined)}
          placeholder="0"
          size="lg"
        />
      </DataForm>
      <ButtonWrapper>
        {!isAuthed ? (
          <ConnectWallet />
        ) : (
            <PlaceBidButton
              disabled={!validParams}
              // variantColor={ validParams ? "green" : "red" }
              colorScheme={ validParams ? "green" : "red" }
              variant="outline"
              onClick={ () => {
                // TODO: validate params
                // TODO: pop up modal to confirm placing bid on mainnet
                // TODO: submit transaction
                console.log("placing bid...");
              }}
            >
              Place Bid
            </PlaceBidButton>
        )}
      </ButtonWrapper>
    </BidBox>
  )
};

export default PlaceBidFrame;