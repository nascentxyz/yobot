import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { default as CTA } from "./CTA";

const PageGroup = styled.div`
  margin-left: 0px;
  margin-right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
  padding-bottom: 2em;
  max-width: 800px;
  z-index: 1;

  @media (max-width: 900px) {
    max-width: 600px;
  }
`;

const MinorHeading = styled.p`
  font-family: "Helvetica Neue";
  font-size: 24px;
  line-height: 1.35;
  letter-spacing: 0.028em;
  text-align: left;
  color: #fff;
  padding-top: 1em;
  padding-bottom: 1em;
  max-width: 600px;
  margin-top: 12px;
  margin-left: 0px;
  margin-right: auto;

  @media (max-width: 900px) {
    font-size: 22px;
    max-width: 400px;
  }
`;

const BigBreak = styled.div`
  padding: 2em;
`;

const LandingPageMainBlurb = styled.h1`
  font-family: "Impact";
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size: 100px;
  line-height: 90px;
  font-weight: 900;
  font-stretch: 200%;
  font-style: normal;
  background-image: linear-gradient(
    70deg,
    #ff02cc 2%,
    #8444df 32%,
    #63cea6 66%,
    #d67336 115%
  );
  text-transform: uppercase;
  background-clip: text;
  color: transparent !important;
  text-align: left;
  letter-spacing: 0.02em;
  text-decoration: none;
  display: inline-block;
  transform: scale(1, 1.6);
  -webkit-transform: scale(1, 1.6); /* Safari and Chrome */
  -moz-transform: scale(1, 1.6); /* Firefox */
  -ms-transform: scale(1, 1.6); /* IE 9+ */
  -o-transform: scale(1, 1.6); /* Opera */

  @media (max-width: 900px) {
    font-size: 60px;
    line-height: 60px;
  }

  @media (max-width: 600px) {
    padding-bottom: 1em;
  }
`;

const LandingPageImage = styled.img`
  width: 485.5px;
  height: 459.8px;
  flex-grow: 0;
  margin-right: 0;
  grid-column-start: 1;
  grid-row-start: 1;
  z-index: 0;
  position: absolute;
  right: 96.5px;
`;

const LandingPageMain = () => (
  <Flex
    minHeight="100px"
    height="auto"
    paddingLeft="106px"
    paddingRight="106px"
    flexGrow={1}
    display="grid"
  >
    <PageGroup>
      <LandingPageMainBlurb>Mint NFTs Before The Crowd</LandingPageMainBlurb>
      <MinorHeading>
        Leverage the power of Ethereum flashbots to mint before the rush, and
        get the NFTs you want.
      </MinorHeading>
    </PageGroup>
    <CTA />
    <LandingPageImage
      src="/LandingPageImage.png"
      alt="Landing Page Background Image"
    />
  </Flex>
);

export default LandingPageMain;
