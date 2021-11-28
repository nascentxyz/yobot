import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { default as LandingPageCTA } from "./LandingPageCTA";

const PageGroup = styled.div`
  margin-left: 0px;
  margin-right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.5em;
  padding-bottom: 2em;
  max-width: 800px;
  z-index: 1;
`;

const MinorHeading = styled.p`
  font-family: "Roboto-Regular";
  font-size: 21px;
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
`;

const LandingPageMainBlurb = styled.h1`
  font-family: "Nimbus-Sans-Extd";
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size: 65px;
  line-height: 55px;
  font-weight: 900;
  font-stretch: ultra-expanded;
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
  text-decoration: none;
  display: inline-block;
  transform: scale(1, 1.6);
  -webkit-transform: scale(1, 1.6); /* Safari and Chrome */
  -moz-transform: scale(1, 1.6); /* Firefox */
  -ms-transform: scale(1, 1.6); /* IE 9+ */
  -o-transform: scale(1, 1.6); /* Opera */
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
  right: 0px;
`;

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto-Regular';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Roboto-Medium';
    font-style: normal;
    font-weight: 500;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Nimbus-Sans-Extd';
    src: url('./fonts/Nimbus-Sans-D-OT-Black-Extended_32740.ttf') format('truetype');
  }
`;

const LandingPageMain = () => (
  <Flex
    minHeight="100px"
    height="auto"
    paddingLeft="26px"
    paddingRight="26px"
    width="960px"
    min-width="960px"
    flexGrow={1}
    display="grid"
    position="relative"
  >
    <FontStyle />
    <PageGroup>
      <LandingPageMainBlurb>Mint NFTs Before The Crowd</LandingPageMainBlurb>
      <MinorHeading>
        Leverage the power of Flashbots to mint before the crowd, and secure the
        NFTs you desire.
      </MinorHeading>
    </PageGroup>
    <LandingPageCTA />
    <LandingPageImage
      src="/LandingPageImage.png"
      alt="Landing Page Background Image"
    />
  </Flex>
);

export default LandingPageMain;
