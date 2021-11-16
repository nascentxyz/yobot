import {
  Navbar,
  Main,
  GradientContainer,
  LandingPageMain,
  FAQModal,
} from "src/components";

import { useDisclosure } from "@chakra-ui/react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GradientContainer>
      <Main>
        <Navbar onOpen={onOpen} launchApp={false} />
        <LandingPageMain />
        <FAQModal isOpen={isOpen} onClose={onClose} />
      </Main>
    </GradientContainer>
  );
};

export default Index;