import {
  Link as ChakraLink,
  Flex
} from '@chakra-ui/react'
import styled from '@emotion/styled';
import { DiscordSVG, TwitterSVG, YobotSVG } from 'src/assets';
import { ConnectWallet, FAQ, LaunchApp } from '.';


const StyledYobot = styled(YobotSVG)`
  margin-right: auto;
  margin-left: 1em;
`;

const LaunchGroup = styled.div`
  margin-left: auto;
  // margin-right: 1em;
  display: flex;
  flex-direction: row;
  min-width: 300px;
`;

const Navbar = ({ accountButton=false, launchApp=false }) => {
  console.log("Passed in accountButton:", accountButton);
  console.log("Passed in launchApp:", launchApp);
  return (
    <Flex
      minHeight='100px'
      height="auto"
      maxHeight='150px'
      p={8}
    >
      <ChakraLink
        href='/'
        d='flex'
        flexGrow={0}
      >
      <StyledYobot />
      </ChakraLink>
      <LaunchGroup>
        <FAQ mx="0.5em" />
        <DiscordSVG mx="0.5em"  />
        <TwitterSVG mx="0.5em"  />
        {accountButton ? <ConnectWallet /> : null}
        {launchApp ? <LaunchApp /> : null}
      </LaunchGroup>
    </Flex>
  )
}

export default Navbar;