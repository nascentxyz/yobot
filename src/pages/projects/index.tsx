import {
  Navbar,
  Main,
  GradientContainer,
  BidPageMain,
  ProjectGrid,
  CTA,
  FAQModal,
} from "src/components";

import { ToastContainer } from "react-toastify";
import { useDisclosure } from "@chakra-ui/react";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GradientContainer>
      <ToastContainer />
      <Navbar onOpen={onOpen} accountButton={true} />
      <FAQModal isOpen={isOpen} onClose={onClose} />
      <ProjectGrid />
    </GradientContainer>

    // <GradientContainer>
    //   <ToastContainer />
    //   <Main>
    //     <Navbar onOpen={onOpen} accountButton={true} />
    //     <BidPageMain />
    //     {/* <CTA onOpen={onOpen} /> */}
    //     <FAQModal isOpen={isOpen} onClose={onClose} />
    //   </Main>
    // </GradientContainer>
  );
};

export default App;
