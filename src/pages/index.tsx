import {
  Navbar,
  Main,
  LandingPageMain,
  ProjectGrid,
  FAQModal,
} from "src/components";
import { ToastContainer } from "react-toastify";
import { useDisclosure } from "@chakra-ui/react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <ToastContainer />
      <Navbar onOpen={onOpen} accountButton={true} />
      <FAQModal isOpen={isOpen} onClose={onClose} />
      <ProjectGrid />
    </div>

    // <Main>
    //   <Navbar onOpen={onOpen} launchApp={false} />
    //   <LandingPageMain />
    //   <FAQModal isOpen={isOpen} onClose={onClose} />
    // </Main>
  );
};

export default Index;
