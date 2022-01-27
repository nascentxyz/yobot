import {
  Navbar,
  GradientContainer,
  ProjectGrid,
  FAQModal,
} from "src/components";
import { ToastContainer } from "react-toastify";
import { useDisclosure } from "@chakra-ui/react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GradientContainer>
      <ToastContainer />
      <Navbar onOpen={onOpen} accountButton={true} />
      <FAQModal isOpen={isOpen} onClose={onClose} />
      <ProjectGrid />
    </GradientContainer>

    /** Old landing page */
    // <GradientContainer>
    //   <Main>
    //     <Navbar onOpen={onOpen} launchApp={false} />
    //     <LandingPageMain />
    //     <FAQModal isOpen={isOpen} onClose={onClose} />
    //   </Main>
    // </GradientContainer>
  );
};

export default Index;
