import { Link as ChakraLink, Button } from "@chakra-ui/react";
import GrayButton from "./GrayButton";

const LaunchAppButton = () => {
  return (
    <ChakraLink href="/app" flexGrow={0} mx={2}>
      <GrayButton width="100%">Launch App</GrayButton>
    </ChakraLink>
  );
};

export default LaunchAppButton;