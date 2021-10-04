import { Flex } from '@chakra-ui/react'
import styled from '@emotion/styled';
import { TrippyArt } from '.';


const PageGroup = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
`;

const MajorHeading = styled.p`
  max-width: 800px;
  // max-height: 254px;
  font-stretch: normal;
  letter-spacing: normal;
  font-style: normal;
  flex-grow: 0;
  line-height: 1.35;
  background-image: linear-gradient(70deg, #ff02cc 2%, #8444df 32%, #63cea6 66%, #d67336 115%);
  font-size: 5em;
  font-weight: bold;
  text-align: center;
  background-clip: text;
  padding-bottom: 0.5em;
`;

const MinorHeading = styled.p`
  max-width: 608px;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  padding-top: 1em;
  padding-bottom: 1em;
`;

const BigBreak = styled.div`
  padding: 2em;
`;

const LandingPageMain = () => (
    <Flex
      minHeight='100px'
      height="auto"
      flexGrow={1}
      p={8}
    >
      <PageGroup>
        <MajorHeading>
          MINT ARTBLOCKS BEFORE THE CROWD
        </MajorHeading>
        <MinorHeading>
          Leverage the power of Ethereum flashbots to mint before the rush, and get the NFTs you want.
        </MinorHeading>
        <BigBreak />
        <TrippyArt />
      </PageGroup>
    </Flex>
  )

export default LandingPageMain;