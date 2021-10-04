import { Flex } from '@chakra-ui/react'
import styled from '@emotion/styled';
import { PlaceBidFrame, NFTFrame, OpenBidsFrame } from '.';


const PageGroup = styled.div`
  // margin: auto;
  // height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BidRow = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2em;
`;

const OpenBidRow = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1100px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BigBreak = styled.div`
  padding: 2em;
`;

const AppPageMain = () => (
    <Flex
      minHeight='100px'
      height="auto"
      flexGrow={1}
      p={8}
    >
      <PageGroup>
        <BidRow>
          <PlaceBidFrame />
          <NFTFrame />
        </BidRow>
        <OpenBidRow>
          <OpenBidsFrame />
        </OpenBidRow>
      </PageGroup>
    </Flex>
  )

export default AppPageMain;