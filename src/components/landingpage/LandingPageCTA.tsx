import { Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const CTABox = styled(Flex)`
  z-index: 1;
`;

const CTACopy = styled.p`
  font-family: "Roboto-Regular";
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.81;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const CTAButton = styled(Button)`
  border-radius: 8px;
  background: #2875e2;
  variant: solid;
  color: white;

  &:hover {
    border-color: var(--chakra-colors-blue-800);
    background-color: var(--chakra-colors-gray-600);
  }
`;

const LandingPageCTA = () => {
  return (
    <CTABox
      bg="#191b1f"
      m="40px auto 146px auto"
      w="675px"
      d="grid"
      p="24px 52px 24px 52px"
      borderRadius="8px"
      border="solid 1px #2c2f36"
      align="center"
    >
      <CTACopy>
        We build tools for NFT collectors. Join the Discord to get notified
        about new drops and tools, and tell us what tools you want us to build.
      </CTACopy>
      <Link href="https://discord.gg/Wm3W6ggHgF" isExternal m="auto">
        <CTAButton w="183px" m="16px auto auto auto">
          Join Discord
        </CTAButton>
      </Link>
    </CTABox>
  );
};

export default LandingPageCTA;
