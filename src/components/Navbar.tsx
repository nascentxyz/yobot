import { Link as ChakraLink, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { DiscordSVG, TwitterSVG, YobotSVG } from "src/assets";
import { ConnectWallet, FAQ, LaunchAppButton } from ".";

const StyledYobot = styled(YobotSVG)`
  margin-right: auto;
  margin-left: 0px;
`;

const LaunchGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
`;

const NavbarFlex = styled(Flex)`
  min-height: 100px;
  height: auto;
  max-height: 150px;
  padding: var(--chakra-space-8);
  padding-left: 26px;
  padding-right: 26px;
  width: 960px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

const Navbar = ({ accountButton = false, launchApp = false, onOpen }) => {
  return (
    <NavbarFlex>
      <FontStyle />
      <ChakraLink href="/" d="flex" flexGrow={0}>
        <StyledYobot />
      </ChakraLink>
      <LaunchGroup>
        <LinkWrapper>
          <ChakraLink
            fontFamily="Roboto"
            textDecoration="none !important"
            height="min-content"
            margin="auto"
            onClick={onOpen}
          >
            <FAQ mx="0.5em" />
          </ChakraLink>
          <ChakraLink
            textDecoration="none !important"
            height="min-content"
            margin="auto"
            isExternal
            href="https://discord.gg/eSXG94jzqe"
          >
            <DiscordSVG mx="0.5em" />
          </ChakraLink>
          <ChakraLink
            textDecoration="none !important"
            height="min-content"
            margin="auto"
            isExternal
            href="https://twitter.com/yobotmarket"
          >
            <TwitterSVG mx="0.5em" />
          </ChakraLink>
        </LinkWrapper>
        {accountButton ? <ConnectWallet /> : null}
        {launchApp ? <LaunchAppButton /> : null}
      </LaunchGroup>
    </NavbarFlex>
  );
};

export default Navbar;