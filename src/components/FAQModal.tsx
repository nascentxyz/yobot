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
  
  import NascentBadge from "./NascentBadge";
  
  const FAQModal = ({ isOpen = false, onClose = () => {} }) => {
    const { t } = useTranslation();
    return (
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"} isCentered={true}>
        <ModalOverlay width={"100%"} height={"100%"}/>
        <ModalContent pt={0} alignItems={"center"}>
          <ModalHeader fontSize="3xl" pb={2} pt={8}>
            {t("FAQ")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={0} width={"auto"}>
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Why Yobot?")}
              </Heading>
              <Text>
                {t(
                  "Yobot is a completely trustless marketplace. You can place bids, where your ETH is escrowed by Yobot contracts until either:"
                )}
              </Text>
              <OrderedList pl="1em" maxWidth="calc(100% - 1em)">
                <ListItem>
                  {t(
                    "A bot comes along and mints your NFT, sending it to your address and receiving the escrowed funds from the Yobot Contracts."
                  )}
                </ListItem>
                <ListItem>
                  {t(
                    "You cancel your order either before the minting, or after (in case you were outbid and no bot was able to fill your order)."
                  )}
                </ListItem>
              </OrderedList>
              <Text>{t("Placing a bid on Yobot means:")}</Text>
              <OrderedList pl="1em" maxWidth="calc(100% - 1em)">
                <ListItem>
                  {t(
                    "You won't experience failed transaction fees that can be absurdly costly during an gas-consuming mint."
                  )}
                </ListItem>
                <ListItem>
                  {t(
                    "You either get you bidded NFTs filled, or your locked ETH is returned once gas drops post-mint."
                  )}
                </ListItem>
                <ListItem>{t("You can circumvent mint limits.")}</ListItem>
              </OrderedList>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Why Yobot?")}
              </Heading>
              <Text>
                {t(
                  "Yobot makes minting NFTs via bots accessible to all NFT buyers, so you have the best chance at securing the art you love!"
                )}
              </Text>
              <Text>
                {t(
                  "Place a bid on an NFT project before it drops and bots will compete to mint an NFT for you as soon as they become available at your specified price."
                )}
              </Text>
              <Text>
                {t(
                  "If the drop sells out before your order is filled, you can cancel your bid at any time for a full refund (minus gas)!"
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Isn't Yobot just Artbotter.io?")}
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
              <Text>
                {t(
                  "With a lot of attention building up around the project, the Artbotter team graciously passed the project onto us, transforming into Yobot!"
                )}
              </Text>
              <Text>
                {t(
                  "Now we are looking to you, our community, to help us build this project out, and shape it's future direction (hosted NFT auctions? smart-batched-auctions https://github.com/FrankieIsLost/smart-batched-auctions), etc, etc)"
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("What's Yobot's Roadmap?")}
              </Heading>
              <Text>
                {t(
                  "Yobot will soon run an experimental market for one drop to flush out any details and get community feedback."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Why participate in Yobot's Alpha?")}
              </Heading>
              <Text>
                {t(
                  "Besides helping us find any bugs and iron out the protocol, we will remember who the original participants of Yobot's Alpha are."
                )}
              </Text>
              <Text>
                {t(
                  "This does _not_ guarantee any financial incentive for participating in the Yobot Alpha, nor advice you to place any amount in the protocol more than you're willing to lose."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Have the Yobot smart contracts been audited?")}
              </Heading>
              <Text>
                {t(
                  "No. The code is open source and anyone is free to check it out here (ArtBlocks version) or here (general ERC721 version). It is straightforward to analyze, but the code has not been audited, and you should not send it more money than you'd be happy losing. If you lose money, there is nothing we can do for you. You won't be reimbursed in any way. We'll be trusting the contract with our own money, but this is alpha software and you should treat it as such."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("How much should I offer to pay?")}
              </Heading>
              <Text>
                {t(
                  "That's completely up to you! But here are a few things to keep in mind:"
                )}
              </Text>
              <UnorderedList pl="1em" maxWidth="calc(100% - 1em)">
                <ListItem>
                  <Text>
                    {t(
                      "Bots won't try to fill your order unless your bid covers their costs. Bots have to use more gas than normal users, because they need to mint the NFT _and_ transfer the NFT to you. Bots have to participate in any gas wars that occur during the drop, and bots pay Yobot a 1% fee for our services."
                    )}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    {t(
                      "For hyped, fixed-price drops it is not uncommon to see bids of more than 1 ETH above the minting price. For dutch auction drops, bids of your target minting price + 20% may do fine. Your guess is as good as ours when it comes to predicting what gas prices will be during a drop."
                    )}
                  </Text>
                </ListItem>
              </UnorderedList>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t(
                  "Yobot won't help you buy the NFTs more cheaply than you could mint them on your own."
                )}
              </Heading>
              <Text>{t("Instead, it will:")}</Text>
              <UnorderedList pl="1em" maxWidth="calc(100% - 1em)">
                <ListItem>
                  <Text>
                    {t(
                      "Help you be faster so you are more likely to get an NFT before they sell out. Bots can adjust gas prices and resubmit transactions faster than any user could do manually. Additionally, the Yobot team will run a flashbots-searcher bot (https://github.com/nascentxyz/yobot-searcher), so the transactions will not be frontrun since the transactions are not whispered across the mempool."
                    )}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    {t(
                      "Ensure you don't ever lose money on reverting transactions. So you can bid as high as you would as if you were gas warring by yourself, but without the risk of losing money on reverting transactions."
                    )}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    {t(
                      "Lets you bypass the project's UI. Bots can start minting and filling your orders before a project's UI is updated to start allowing purchases."
                    )}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    {t(
                      "Bypass any per-account mint limits an NFT project may have."
                    )}
                  </Text>
                </ListItem>
              </UnorderedList>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Can I submit bids for more than one NFT per project?")}
              </Heading>
              <Text>
                {t(
                  "Yes. Yobot allows users to place an unlimited number of orders, even if the NFT project has a per-account mint limit (assuming there are many running bots or bots manage many addresses for minting)."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Can I submit bids for multiple projects at once?")}
              </Heading>
              <Text>
                {t(
                  "Yes, though Yobot Alpha is limited to a single project - one drop, that is. But soon:tm: you will be able to place bids for as many projects as you want."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Can my bids be partially filled?")}
              </Heading>
              <Text>
                {t(
                  "Yes. For example, suppose you place bids for 10 NFTs offering to pay 1 ETH each, so you've deposited 10 ETH into Yobot. It is possible the bots will only manage to get 7 of the NFTs for you. You could then cancel the remainder of your bid (3 NFTs) and get the remainder of your deposit (3 ETH) back."
                )}
              </Text>
              <Text>
                {t(
                  "In the future, it's possible Yobot can support minting requirements such as only fulfilling all orders or orders with x number of NFTs - shadowy solidity codooors, we need you!"
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("How do I increase or decrease my bid after placing it?")}
              </Heading>
              <Text>
                {t(
                  "To increase or decrease your bid you must first cancel your existing bid, and then place a new bid."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Are there any fees?")}
              </Heading>
              <Text>
                {t(
                  "Bots that fill orders through Yobot pay a fee of 1% to Yobot. Users pay no fees at all."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Can I specify an individual tokenId that I want?")}
              </Heading>
              <Text>
                {t(
                  'Not for Yobot Alpha. When you place a bid for a NFT, you specify a particular project, and your bid can be filled with any NFT from that project. You may end up with "floor price" NFTs or rare NFTs. You never know.'
                )}
              </Text>
              <Text>
                {t("This is subject to change in the next iterations of Yobot!")}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Does Yobot work if the project uses a Dutch auction?")}
              </Heading>
              <Text>
                {t(
                  "Yes. Yobot works with any possible initial distribution mechanism, including auctions. The smart contract is completely agnostic to the initial distribution method and any restrictions on them (e.g. limited minting requirements, no-contract purchases, etc). Yobot users never need to worry about any of that. The bots will handle it. You make a large enough offer for some NFTs, and the bots will do whatever it takes to get them for you."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t(
                  "Can I order an NFT that requires something other than ETH to mint?"
                )}
              </Heading>
              <Text>
                {t(
                  "Yes, Yobot can fill orders for NFTs that require something other than ETH to mint. However, when you create an order on Yobot, you must make your offer in ETH."
                )}
              </Text>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("Community Asks")}
              </Heading>
              <UnorderedList pl="1em" maxWidth="calc(100% - 1em)">
                <ListItem>
                  <Text>{t("Say gm.")}</Text>
                </ListItem>
                <ListItem>
                  <Text>{t("Share feedback!")}</Text>
                </ListItem>
                <ListItem>
                  <Text>{t("Become a memooor")} #🎨-memes</Text>
                </ListItem>
                <ListItem>
                  <Text>{t("Help other community members.")}</Text>
                </ListItem>
                <ListItem>
                  <Text>{t("Follow the rules ")} 🙄 #📝-rules</Text>
                </ListItem>
                <ListItem>
                  <Text>{t("Have Fun and Mint NFTs!")}</Text>
                </ListItem>
              </UnorderedList>
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
                <ListItem>
                  <Stack direction="row">
                    <ChakraLink
                      display="flex"
                      mr="0.2em"
                      color="blue.400"
                      isExternal
                      href="https://twitter.com/kristiehuang"
                    >
                      Kristie Huang
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
                      href="https://twitter.com/jammontasser"
                    >
                      Jamaal Montasser
                      <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                        <ExternalLinkIcon />
                      </span>
                    </ChakraLink>
                  </Stack>
                </ListItem>
              </UnorderedList>
            </Flex>
  
            <Flex direction="column" my="1em">
              <Heading mb="0.5em" as="h4" size="md">
                {t("How to reach out to the Yobot team?")}
              </Heading>
              <Stack direction="row">
                <Text>{t("Reach out to the team on")}</Text>
                <Stack
                  marginInlineStart="0.2em"
                  width="min-content"
                  direction="row"
                >
                  <ChakraLink
                    display="flex"
                    color="blue.400"
                    isExternal
                    href="https://twitter.com/yobotmarket"
                  >
                    Twitter
                    <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                      <ExternalLinkIcon />
                    </span>
                  </ChakraLink>
                  !
                </Stack>
                <Text>{t("or hop in our")}</Text>
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