import { Flex, Heading } from '@chakra-ui/react'
import styled from '@emotion/styled';
import { YobotSVG } from 'src/assets';


const StyledYobot = styled(YobotSVG)`
  margin-right: auto;
  margin-left: 1rem;
`;

const Navbar = () => (
  <Flex
    minHeight='100px'
    height="auto"
    maxHeight='150px'
    p={8}
  >
    <StyledYobot />
    <Heading px={2} fontSize="3vw" bgClip="text" bgGradient="linear(to right, #4fa682, #2c5282)">{title}</Heading>
    <Heading fontSize="3vw">⚡</Heading>
  </Flex>
)

export default Navbar;