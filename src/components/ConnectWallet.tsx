import { Button, Box, Text, useDisclosure } from "@chakra-ui/react";
import { useCallback } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Identicon, AccountModal } from "src/components";
import { useYobot } from "src/contexts/YobotContext";
import { useAuthedCallback, useIsSmallScreen } from "src/hooks";

const ButtonWrapper = styled.div`
  margin-left: var(--chakra-space-2);
  margin-right: var(--chakra-space-2);
  flex-grow: 0;
`;

const NoShadowButton = styled(Button)`
  height: 56px;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.75rem;

  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
`;

const ConnectWallet = ({ fullWidth = false, darkerBackground = false }) => {
  const { address, isAuthed, balance, login, isAttemptingLogin } = useYobot();

  const {
    isOpen: isYobotModalOpen,
    onOpen: openYobotModal,
    onClose: closeYobotModal,
  } = useDisclosure();

  const openModal = useAuthedCallback(openYobotModal);

  const { t } = useTranslation();

  const isMobile = useIsSmallScreen();

  const handleAccountButtonClick = useCallback(() => {
    // console.log("is authed:", isAuthed);
    if (isAuthed) {
      openModal();
    } else login();
  }, [isAuthed, login, openModal]);

  const connectWalletNavbarButton = (
    <div className="flex items-center space-x-1 lg:space-x-5">
      <nav className="lg:flex lg:items-center lg:space-x-2">
        <a
          onClick={handleAccountButtonClick}
          className="flex items-center h-12 px-6 py-2 space-x-2 text-base font-medium text-white rounded-full bg-yobotblue"
        >
          <span>Connect Wallet</span>
        </a>
      </nav>

      {/* <div className="lg:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center px-3 py-2 space-x-2 font-semibold leading-6 text-gray-800 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 hi-solid hi-menu"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div> */}
    </div>
  );

  const accountModalButton = (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md" w="max-content">
          {balance && balance.toFixed(3)} ETH
        </Text>
      </Box>
      <NoShadowButton
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        width="100%"
        onClick={openYobotModal}
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {address &&
            `${address.slice(0, 6)}...${address.slice(
              address.length - 4,
              address.length
            )}`}
        </Text>
        <Identicon />
      </NoShadowButton>
      <AccountModal isOpen={isYobotModalOpen} onClose={closeYobotModal} />
    </Box>
  );

  if (isAuthed) {
    return accountModalButton;
  } else {
    return connectWalletNavbarButton;
  }
};

export default ConnectWallet;
