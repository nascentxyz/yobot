import {
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const ButtonWrapper = styled.div`
  margin-left: var(--chakra-space-2);
  margin-right: var(--chakra-space-2);
  flex-grow: 0;
`;

const ConnectWallet = () => {
  return (
    <ButtonWrapper>
      <Button
        width="100%"
        variant="outline"
        colorScheme="buttonBlue"
      >
        Connect Wallet
      </Button>
    </ButtonWrapper>
  );
};

export default ConnectWallet;