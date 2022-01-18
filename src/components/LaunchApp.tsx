import { Link as ChakraLink, Button } from "@chakra-ui/react";

const LaunchApp = () => {
  return (
    <ChakraLink href="/app" flexGrow={0} mx={2}>
      <Button width="100%" variant="outline" colorScheme="buttonBlue">
        Launch App
      </Button>
    </ChakraLink>
  );
};

export default LaunchApp;
