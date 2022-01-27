import { useRouter } from "next/router";
import {
  Navbar,
  GradientContainer,
  BidPageMain,
  FAQModal,
} from "src/components";

import { ToastContainer } from "react-toastify";
import { useDisclosure } from "@chakra-ui/react";

const ProjectBidPage = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <ToastContainer />
      <Navbar onOpen={onOpen} accountButton={true} />
      <FAQModal isOpen={isOpen} onClose={onClose} />
      <BidPageMain projectId={projectId} />
    </div>
  );
};

export default ProjectBidPage;
