import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { HeadlineSVG } from "src/assets";
import { Headline, TrippyArt } from ".";

const PageGroup = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
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
  <Flex minHeight="100px" height="auto" flexGrow={1} p={8}>
    <PageGroup>
      <Headline />
      <MinorHeading>
        Leverage the power of Ethereum flashbots to mint before the rush, and
        get the NFTs you want.
      </MinorHeading>
      <BigBreak />
      <TrippyArt />
    </PageGroup>
  </Flex>
);

export default LandingPageMain;
