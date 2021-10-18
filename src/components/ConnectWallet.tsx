import {
  Button, useDisclosure
} from '@chakra-ui/react';
import { useCallback } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from "react-i18next";

import { useYobot } from 'src/contexts/YobotContext';
import { useAuthedCallback } from 'src/hooks/';

const ButtonWrapper = styled.div`
  margin-left: var(--chakra-space-2);
  margin-right: var(--chakra-space-2);
  flex-grow: 0;
`;

const ConnectWallet = () => {
  const { address, isAuthed, login, isAttemptingLogin } = useYobot();

  const {
    isOpen: isSettingsModalOpen,
    onOpen: openSettingsModal,
    onClose: closeSettingsModal,
  } = useDisclosure();

  const authedOpenSettingsModal = useAuthedCallback(openSettingsModal);

  const {
    isOpen: isClaimRGTModalOpen,
    onOpen: openClaimRGTModal,
    onClose: closeClaimRGTModal,
  } = useDisclosure();

  const authedOpenClaimRGTModal = useAuthedCallback(openClaimRGTModal);

  const { hasClaimableRewards } = useClaimable();

  const { t } = useTranslation();

  const isMobile = useIsSmallScreen();

  const handleAccountButtonClick = useCallback(() => {
    if (isAuthed) {
      openModal();
    } else login();
  }, [isAuthed, login, openModal]);

  return (
    <ButtonWrapper>
      <Button
        width="100%"
        variant="outline"
        colorScheme="buttonBlue"
        onClick={handleAccountButtonClick}
      >
        Connect Wallet
      </Button>
    </ButtonWrapper>
  );
};

export default ConnectWallet;