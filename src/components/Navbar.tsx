import { Link as ChakraLink, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { DiscordSVG, TwitterSVG, YobotSVG } from "src/assets";
import { ConnectWallet, FAQ, LaunchAppButton } from ".";

const StyledYobot = styled(YobotSVG)`
  margin-right: auto;
  margin-left: 1em;
`;

const LaunchGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  min-width: 300px;
  justify-content: flex-end;

  @media (max-width: 600px) {
    min-width: 100px;
    flex-direction: column;
    margin: auto 0 auto auto;
  }
`;

const NavbarFlex = styled(Flex)`
  min-height: 100px;
  height: auto;
  max-height: 150px;
  padding: var(--chakra-space-8);

  @media (max-width: 600px) {
    padding: var(--chakra-space-4);
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    position: absolute;
    top: 0.5em;
    width: 100%;
    left: 0;
    justify-content: center;
  }
`;

const Navbar = ({ accountButton = false, launchApp = false, onOpen }) => {
  return (
    <NavbarFlex>
      <ChakraLink href="/" d="flex" flexGrow={0}>
        <StyledYobot />
      </ChakraLink>
      <LaunchGroup>
        <LinkWrapper>
          <ChakraLink
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
