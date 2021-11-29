// AccountModal.tsx
import React from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import Identicon from "./Identicon";
import { useYobot } from "src/contexts/YobotContext";
import { NoShadowButton, NoShadowLink } from "src/components";
import { getNetworkPrefix } from "src/utils";

type AccountModalProps = {
  isOpen: any;
  onClose: any;
};

const AccountModal = ({ isOpen, onClose }: AccountModalProps) => {
  const { address, logout, chainId, login } = useYobot();

  // ** Deactivate/logout with Disclosure **
  function handleDeactivateAccount() {
    logout();
    onClose();
  }

  // ** Switch Wallet with Disclosure **
  const handleSwitchWallet = async () => {
    // logout();
    onClose();
    setTimeout(async () => await login(false), 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Account
        </ModalHeader>
        <ModalCloseButton
          color="white"
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Connected with MetaMask
              </Text>
              <NoShadowButton
                variant="outline"
                size="sm"
                borderColor="blue.800"
                borderRadius="3xl"
                color="blue.500"
                fontSize="13px"
                fontWeight="normal"
                px={2}
                height="26px"
                _hover={{
                  background: "none",
                  borderColor: "blue.300",
                  textDecoration: "none",
                }}
                onClick={handleDeactivateAccount}
              >
                Disconnect
              </NoShadowButton>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" lineHeight={1}>
                <Identicon />
                <Text
                  color="white"
                  fontSize="xl"
                  fontWeight="semibold"
                  ml="2"
                  lineHeight="1.1"
                >
                  {address &&
                    `${address.slice(0, 6)}...${address.slice(
                      address.length - 4,
                      address.length
                    )}`}
                </Text>
              </Flex>
              {/* <NoShadowButton
                variant="outline"
                size="sm"
                borderColor="blue.800"
                borderRadius="3xl"
                color="blue.500"
                fontSize="13px"
                fontWeight="normal"
                px={2}
                height="26px"
                _hover={{
                  background: "none",
                  borderColor: "blue.300",
                  textDecoration: "none",
                }}
                onClick={handleSwitchWallet}
              >
                Switch Wallet
              </NoShadowButton> */}
            </Flex>
            <Flex alignContent="center" my={3}>
              <NoShadowButton
                variant="link"
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                _hover={{
                  textDecoration: "none",
                  color: "whiteAlpha.800",
                }}
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(`${address}`);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <CopyIcon mr={1} />
                Copy Address
              </NoShadowButton>
              <NoShadowLink
                fontSize="sm"
                display="flex"
                alignItems="center"
                href={`https://${
                  chainId > 0 ? getNetworkPrefix(chainId) : ""
                }etherscan.io/address/${address}`}
                isExternal
                color="gray.400"
                ml={6}
                _hover={{
                  color: "whiteAlpha.800",
                  // textDecoration: "underline",
                }}
              >
                <ExternalLinkIcon mr={1} />
                View on Explorer
              </NoShadowLink>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter
          justifyContent="begin"
          background="gray.700"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
          p={6}
        >
          <Text
            color="white"
            textAlign="left"
            fontWeight="medium"
            fontSize="md"
            width="100%"
          >
            Your transactions will appear here...
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AccountModal;
