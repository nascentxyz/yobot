import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  PlaceBidFrame,
  NFTFrame,
  OpenBidsFrame,
  CancelledBidsFrame,
  SuccessfulBidsFrame,
} from ".";

const AppPageMain = () => (
  <Flex
    mt="0 !important"
    minHeight="100px"
    height="auto"
    flexGrow={1}
    p={4}
    pb={8}
  >
    <PageGroup>
      <MarginEightPix>
        <BidRow>
          <PlaceBidFrame />
          <NFTFrame />
        </BidRow>
        <OpenBidRow>
          <OpenBidsFrame />
        </OpenBidRow>
        <CancelledBidRow>
          <CancelledBidsFrame />
        </CancelledBidRow>
        <SuccessfulBidRow>
          <SuccessfulBidsFrame />
        </SuccessfulBidRow>
      </MarginEightPix>
    </PageGroup>
  </Flex>
);

const PageGroup = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BidRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2em;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

const OpenBidRow = styled.div`
  margin: auto;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CancelledBidRow = styled(OpenBidRow)``;

const SuccessfulBidRow = styled(OpenBidRow)``;

const MarginEightPix = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 2em auto auto auto;
`;

export default AppPageMain;
