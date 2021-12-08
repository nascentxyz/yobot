import React from "react";
import ProjectDetails from "./ProjectDetails";
import ProjectBidTable from "./ProjectBidTable";
import BidForm from "./BidForm";

function BidPageMain({ projectId }) {
  // FIXME
  function getProjectDetailsFromId(pid) {
    const projectDetails = {
      projectId: "0",
      title: "Art Blocks",
      projectWebsite: "https://www.artblocks.io/",
      description:
        "Art Blocks is a first of its kind platform focused on genuinely programmable on demand generative content that is stored immutably on the Ethereum Blockchain.",
      launchTime: new Date("December 31, 2021 23:59:59 PST"),
      previewImageSrc:
        "https://www.artblocks.io/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fsquig_0_transparent.11e0ba7d94e0dcfd0d0a9fcdbc26e7fe.png&w=640&q=75",
      projectTokenAddress: "0xd8bbf8ceb445de814fb47547436b3cfeecadd4ec",
    };
    return projectDetails;
  }

  return (
    <div>
      <div className="max-w-screen-lg m-auto mt-2 mt-12 text-gray-300 bg-black xl:max-w-7xl App font-Roboto sm:">
        <div className="pb-6 mx-auto sm:pb-0 flex border border-gray-700 rounded-xl  flex-col-reverse max-w-screen-xl m-auto  bg-gray-800 sm:flex-row sm:mb-4">
          <BidForm />
          <ProjectDetails props={getProjectDetailsFromId(projectId)} />
        </div>
        <ProjectBidTable />
      </div>
    </div>
  );
}

export default BidPageMain;
