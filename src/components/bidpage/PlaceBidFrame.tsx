import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Input,
  Flex
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { toast } from "material-react-toastify";
import { useYobot } from "src/contexts/YobotContext";

import { ConnectWallet } from "..";

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

  &:focus {
    outline: none !important;
    box-shadow: none !important;
    border-color: var(--chakra-colors-whiteAlpha-400) !important;
  }
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
  letter-spacing: normal;
  text-align: left;
  color: #95969a;
`;

const PlaceBidFrame = () => {
  const { isAuthed } = useYobot();
  const [validParams, setValidParams] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);

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
    console.log("updating gas estimates...");
  };

  // ** Every 15 seconds, update gas estimates **
  useEffect(() => {
    let gasTimer = setTimeout(() => updateGasEstimates(), 15 * 1000);
    return () => {
      clearTimeout(gasTimer);
    };
  }, []);

  // ** Bid placed helper function **
  const placeBid = () => {
    setPlacingBid(true);

    // ** Freeze Inputs **
    const _frozenBidPrice = bidPrice;
    const _frozenBidQty = bidQty;

    // ** Validate Frozen Inputs (sanity check) **
    if (validateParams(_frozenBidPrice, _frozenBidQty)) {
      // ** pop up modal for first time users or recurring if unchecked
      const isBasedYobotApe = localStorage.getItem("IS_BASED_YOBOT_APE");
      console.log("Is based yobot ape?", isBasedYobotApe);
      if (
        isBasedYobotApe === null ||
        isBasedYobotApe === undefined ||
        !isBasedYobotApe
      ) {
        // ** Pop up modal and await confirmation to continue **

        console.log("popping up modal for user verification...");
        // TODO:::
        // submitBid(_frozenBidPrice, _frozenBidQty);
      } else {
        // ** Continue with placing bid **
        submitBid(_frozenBidPrice, _frozenBidQty);
      }
    } else {
      // !! Invalid Inputs !!
      toast.error({
        title: "Invalid Inputs!",
        description:
          "Please enter a valid bid price and quantity and try again!",
        status: "error",
        position: "bottom",
        duration: 3000,
        isClosable: true,
      });
      setPlacingBid(false);
    }
  };

  const submitBid = (_frozenBidPrice, _frozenBidQty) => {
    // TODO: submit transaction
    console.log("placing bid...");

    // ** Unfreeze Everything **
    // TODO: move this to once transaction is placed
    setPlacingBid(false);
  };

  // ** Helper function to validate parameters
  const validateParams = (_bidPrice, _bidQty) => {
    if (_bidPrice && _bidPrice > 0 && _bidQty && _bidQty > 0) {
      setValidParams(true);
      return true;
    }
    // ** Any other case we reject **
    setValidParams(false);
    return false;
  };

  // ** Whenever our input values change, we want to validate them **
  useEffect(() => {
    validateParams(bidPrice, bidQty);
  }, [bidPrice, bidQty]);

  return (
    <BidBox>
      <PlaceBidText>Place Bid</PlaceBidText>
      <DataForm>
        <PriceText>Price per NFT (ETH)</PriceText>
        <PriceSubText>
          Include gas fees in your bid price. Higher bids will be filled first!
        </PriceSubText>
        <CustomInput
          type="number"
          min={0}
          value={bidPrice}
          onChange={(e) =>
            setBidPrice(e.target.value ? parseFloat(e.target.value) : undefined)
          }
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
          onChange={(e) =>
            setBidQty(e.target.value ? parseInt(e.target.value) : undefined)
          }
          placeholder="0"
          size="lg"
        />
      </DataForm>
      <ButtonWrapper>
        {!isAuthed ? (
          <ConnectWallet fullWidth={true} darkerBackground={true} />
        ) : (
          <PlaceBidButton
            disabled={!validParams}
            colorScheme={validParams ? "green" : "red"}
            color={validParams ? "green.400" : "red.300"}
            variant="outline"
            onClick={placeBid}
            display={"flex"}
          >
            {!placingBid ? ('Place Bid') : (
              <Spinner margin={"auto"} color={"green.400"} />
            )}
          </PlaceBidButton>
        )}
      </ButtonWrapper>
    </BidBox>
  );
};

export default PlaceBidFrame;
