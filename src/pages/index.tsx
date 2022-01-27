import { Navbar, Main, LandingPageMain, FAQModal } from "src/components";

import { useDisclosure } from "@chakra-ui/react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Main>
      <Navbar onOpen={onOpen} launchApp={false} />
      <LandingPageMain />
      <FAQModal isOpen={isOpen} onClose={onClose} />
    </Main>
  );
};

export default Index;
