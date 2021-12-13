import { Link as ChakraLink, Button } from "@chakra-ui/react";
import { GrayButton } from "./";

const LaunchAppButton = () => {
  return (
    <ChakraLink href="/projects" flexGrow={0} ml={2}>
      <GrayButton width="100%">Launch App</GrayButton>
    </ChakraLink>
  );
};

export default LaunchAppButton;
