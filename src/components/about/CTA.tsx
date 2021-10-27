import {
  Link as ChakraLink,
  Text,
  Flex,
  Stack
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { useTranslation } from "react-i18next";

import { FAQModal, GrayButton } from "src/components";

const YobotInterestForm = "https://forms.gle/BJLeGxdtCjL9kEtc8";

const CTA = ({ onOpen }) => {
  const { t } = useTranslation();
  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      bottom="0"
      width="100%"
      mt="auto"
      pb={2}
    >
      <Flex direction="column" width="100%" pb={4}>
        <Flex
          direction="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          maxWidth="48rem"
          pb={4}
        >
          <Flex flexGrow={0} mx={2} minWidth="100px">
            <GrayButton width="100%" onClick={onOpen}>
              {t("FAQ")}
            </GrayButton>
          </Flex>
          <Stack direction="row" mx={2}>
            <ChakraLink
              display="flex"
              isExternal
              href="https://github.com/nascentxyz/yobot"
              style={{ textDecoration: "none" }}
            >
              <GrayButton width="100%">
                <Text textDecoration="none">
                  {t("Github")}
                </Text>{" "}
                <span style={{ margin: "auto", paddingLeft: "0.4em" }}>
                  <ExternalLinkIcon marginTop="-5px" />
                </span>
              </GrayButton>
            </ChakraLink>
          </Stack>
          <Stack direction="row" mx={2}>
            <ChakraLink
              display="flex"
              isExternal
              href={YobotInterestForm}
              style={{ textDecoration: "none" }}
            >
              <GrayButton width="100%">
                <Text textDecoration="none">
                  {t("Feedback")}
                </Text>{" "}
                <span style={{ margin: "auto", paddingLeft: "0.4em" }}>
                  <ExternalLinkIcon marginTop="-5px" />
                </span>
              </GrayButton>
            </ChakraLink>
          </Stack>
        </Flex>
        <Flex
          direction="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          maxWidth="48rem"
        >
          <Text>
            Built with ❤️ by{" "}
            <ChakraLink
              color="blue.500"
              isExternal
              href="https://twitter.com/andreasbigger"
            >
              Andreas Bigger
            </ChakraLink>{" "}
            @{" "}
            <ChakraLink color="#4fa682" isExternal href="https://nascent.xyz">
              Nascent
            </ChakraLink>{" "}
            and{" "}
            <ChakraLink
              color="blue.500"
              isExternal
              href="https://twitter.com/andreasbigger"
            >
              Jamaal
            </ChakraLink>{" "}
          </Text>
        </Flex>
        <Flex
          direction="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          maxWidth="48rem"
        >
          <Text>
            Say thanks by donating to{" "}
            <ChakraLink
              color="blue.500"
              isExternal
              href="https://thegivingblock.com/donate/"
            >
              The Giving Block Charities
            </ChakraLink>{" "}
            ❤️
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CTA;
