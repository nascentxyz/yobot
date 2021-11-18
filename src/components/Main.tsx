import { Stack, StackProps } from "@chakra-ui/react";

const Main = (props: StackProps) => (
  <Stack
    spacing="1.5em"
    width="100%"
    mt="0"
    pt="2em"
    px="1em"
    alignItems="center"
    flexGrow={1}
    {...props}
  />
);

export default Main;
