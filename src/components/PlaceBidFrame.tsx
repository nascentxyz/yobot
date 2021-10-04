import { Input } from "@chakra-ui/input";
import styled from "@emotion/styled";
import { ConnectWallet } from ".";

const BidBox = styled.div`
  min-width: 480px;
  height: auto;
  margin: auto;
  padding: 1em;
  border-radius: 24px;
  background-color: #191b1f;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlaceBidText = styled.p`
  height: auto;
  margin: auto;
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

const DataForm = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  flex-direction: column;
`;

const PriceText = styled.p`
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

const PriceSubText = styled.p`
  height: auto;
  // margin: auto;
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
  margin: auto;
  border-radius: 1em;
  border: solid 1px #2c2f36;
  background-color: #212429;
`;

const QuantityText = styled.p`
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
  padding-top: 1em;
`;


const PlaceBidFrame = () => {

  return (
    <BidBox>
      <PlaceBidText>Place Bid</PlaceBidText>
      <DataForm>
        <PriceText>Price per NFT (ETH)</PriceText>
        <PriceSubText>Include gas fees in your bid price. Higher bids will be filled first!</PriceSubText>
        <CustomInput placeholder="0.00" size="lg" />
        <QuantityText>Quantity</QuantityText>
        <CustomInput placeholder="0" size="lg" />
      </DataForm>
      <ConnectWallet />
    </BidBox>
  )
};

export default PlaceBidFrame;