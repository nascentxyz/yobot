import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Text,
  OrderedList,
  ListItem,
  Link as ChakraLink,
  UnorderedList,
  Stack,
  Flex,
  Code,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import { NascentBadge } from "..";

const FAQModal = ({ isOpen = false, onClose = () => {} }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent maxWidth={"800px"}>
        <ModalHeader>{t("FAQ")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody width={"auto"}>
          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("Why Yobot?")}
            </Heading>
            <Stack direction="row">
              <Text>{t("Yobot is the next evolution of")}</Text>
              <Stack
                marginInlineStart="0.2em"
                width="min-content"
                direction="row"
              >
                <ChakraLink
                  display="flex"
                  margin="auto"
                  color="blue.400"
                  isExternal
                  href="https://artbotter.io"
                >
                  Artbotter
                  <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                    <ExternalLinkIcon />
                  </span>
                </ChakraLink>
              </Stack>
            </Stack>
            <Text>{t("Placing a bid on Yobot means:")}</Text>
            <OrderedList pl="1em" maxWidth="calc(100% - 1em)">
              <ListItem>
                {t(
                  "You won't experience failed transaction fees that can be absurdly costly during an gas-consuming mint."
                )}
              </ListItem>
              <ListItem>
                {t(
                  "You either get you bidded nfts filled or your locked eth is returned once gas drops post-mint."
                )}
              </ListItem>
              <ListItem>{t("You can circumvent mint limits.")}</ListItem>
            </OrderedList>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("What Yobot Can't Do")}
            </Heading>
            <Text>{t("Yobot can't promise cheap NFT mints.")}</Text>
            <Text>{t("There is no way to circumvent the required cost.")}</Text>
            <Text>
              {t("Where: ")}
              <Code>
                {t("cost = bid + minting gas + transfer gas + bot bribe")}
              </Code>
            </Text>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("Who's building Yobot?")}
            </Heading>
            <Text>
              {t("Yobot was graciously passed to the ")}
              <ChakraLink isExternal href="https://nascent.xyz">
                Nascent
              </ChakraLink>
              {t(" team and other collaborators - all listed below!")}
            </Text>
            <UnorderedList pl="1em" maxWidth="calc(100% - 1em)">
              <ListItem>
                <Stack direction="row">
                  <ChakraLink
                    display="flex"
                    mr="0.2em"
                    color="blue.400"
                    isExternal
                    href="https://twitter.com/delitzer"
                  >
                    Dan Elitzer
                    <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                      <ExternalLinkIcon />
                    </span>
                  </ChakraLink>
                  <NascentBadge />
                </Stack>
              </ListItem>
              <ListItem>
                <Stack direction="row">
                  <ChakraLink
                    display="flex"
                    mr="0.2em"
                    color="blue.400"
                    isExternal
                    href="https://twitter.com/andreasbigger"
                  >
                    Andreas Bigger
                    <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                      <ExternalLinkIcon />
                    </span>
                  </ChakraLink>
                  <NascentBadge />
                </Stack>
              </ListItem>
            </UnorderedList>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("How to reach out to the Yobot team?")}
            </Heading>
            <Stack direction="row">
              <Text>
                {t(
                  "Reach out to the team on Twitter (links above) or hop in our"
                )}
              </Text>
              <Stack
                marginInlineStart="0.2em"
                width="min-content"
                direction="row"
              >
                <ChakraLink
                  display="flex"
                  color="purple.400"
                  isExternal
                  href="https://discord.gg/eSXG94jzqe"
                >
                  Discord
                  <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                    <ExternalLinkIcon />
                  </span>
                </ChakraLink>
                !
              </Stack>
            </Stack>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FAQModal;
