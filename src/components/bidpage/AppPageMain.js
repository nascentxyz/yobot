import React from "react";
import ProjectDetails from "../jamaal-components/ProjectDetails";
import ProjectBidTable from "./ProjectBidTable";
import BidForm from "./BidForm";

function AppPageMain() {
  return (
    <div>
      <div className="max-w-screen-lg m-auto mt-2 mt-12 text-gray-300 bg-black xl:max-w-7xl App font-Roboto sm:">
        <div className="pb-6 mx-auto sm:pb-0 flex border border-gray-700 rounded-xl  flex-col-reverse max-w-screen-xl m-auto  bg-gray-800 sm:flex-row sm:mb-4">
          <BidForm />
          <ProjectDetails />
        </div>
        <ProjectBidTable />
      </div>
    </div>
  );
}

export default AppPageMain;
