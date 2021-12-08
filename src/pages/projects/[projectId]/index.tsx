import { useRouter } from "next/router";
import { Navbar, GradientContainer, BidPageMain } from "src/components";

import { ToastContainer } from "react-toastify";
import { useDisclosure } from "@chakra-ui/react";

const ProjectBidPage = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const { onOpen } = useDisclosure();

  return (
    <GradientContainer>
      <ToastContainer />
      <Navbar onOpen={onOpen} accountButton={true} />
      <BidPageMain projectId={projectId} />
    </GradientContainer>
  );
};

export default ProjectBidPage;
