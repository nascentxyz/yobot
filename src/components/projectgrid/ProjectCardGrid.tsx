import React from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardDisabled from "./ProjectCardDisabled";
import { useEffect, useState } from "react";

function ProjectCardGrid() {
  const [liveProjects, setLiveProjects] = useState([]);
  const [tbaProjects, setTbaProjects] = useState([]); // for ProjectCardDisabled

  // function getLiveProjects() {
  //   const p1 = {
  //     projectId: "0",
  //     title: "Art Blocks",
  //     projectWebsite: "https://www.artblocks.io/",
  //     description:
  //       "Art Blocks is a first of its kind platform focused on genuinely programmable on demand generative content that is stored immutably on the Ethereum Blockchain.",
  //     launchTime: new Date("December 31, 2021 23:59:59 PST"),
  //     previewImageSrc:
  //       "/artblocks.png",
  //     projectTokenAddress: "0xd8bbf8ceb445de814fb47547436b3cfeecadd4ec",
  //   };
  //   const p2 = {
  //     projectId: "1",
  //     title: "StrictMint",
  //     projectWebsite: "https://goerli.etherscan.io/address/0xed198777a685a7152ecf165b4a4dee010fe6f933",
  //     description:
  //       "ERC721 with strict minting requirements",
  //     launchTime: new Date("February 1, 2022 23:59:59 PST"),
  //     previewImageSrc:
  //       "/etherscan.png",
  //     projectTokenAddress: "0xed198777a685a7152ecf165b4a4dee010fe6f933",
  //   };
  //   return [
  //     p1,
  //     p2
  //   ];
  // }

  const fetchProjects = async () => {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // ** Set the projects ** //
    const { projects } = await response.json();
    setLiveProjects(projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container max-w-screen-lg p-4 mx-auto lg:p-0 font-Rubik">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {liveProjects.length + tbaProjects.length > 0 ? (
          liveProjects.map((project) => {
            return <ProjectCard key={project.projectId} project={project} />;
          })
        ) : (
          // TODO: display tbaProjects as well
          <p>No projects available</p>
        )}
      </div>
    </div>
  );
}

export default ProjectCardGrid;
