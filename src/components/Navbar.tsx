import { Flex } from '@chakra-ui/react'
import styled from '@emotion/styled';
import { DiscordSVG, TwitterSVG, YobotSVG } from 'src/assets';
import { FAQ, LaunchApp } from '.';


const StyledYobot = styled(YobotSVG)`
  margin-right: auto;
  margin-left: 1em;
`;

const LaunchGroup = styled.div`
  margin-left: auto;
  margin-right: 1em;
  display: flex;
  flex-direction: row;
  min-width: 300px;
`;

const Navbar = () => (
  <Flex
    minHeight='100px'
    height="auto"
    maxHeight='150px'
    p={8}
  >
    <StyledYobot />
    <LaunchGroup>
      <FAQ />
      <DiscordSVG />
      <TwitterSVG />
      <LaunchApp />
    </LaunchGroup>
  </Flex>
)

export default Navbar;