import React from "react";
import ProjectDetails from "../jamaal-components/ProjectDetails";
import ProjectBidTable from "./ProjectBidTable";
import BidForm from "./BidForm";

function AppPageMain() {
  return (
    <div>
      <div className="max-w-screen-lg m-auto mt-2 mt-12 text-gray-300 bg-black xl:max-w-7xl App font-Roboto sm:">
        <div className="flex flex-col-reverse max-w-screen-xl pb-6 m-auto mx-auto bg-gray-800 border border-gray-700 sm:pb-0 rounded-xl sm:flex-row sm:mb-4">
          <BidForm />
          <ProjectDetails />
        </div>
        <ProjectBidTable />
      </div>
    </div>
  );
}

export default AppPageMain;
