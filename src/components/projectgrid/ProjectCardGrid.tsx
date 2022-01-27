import React from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardDisabled from "./ProjectCardDisabled";
import { useEffect, useState } from "react";

function ProjectCardGrid() {
  const [liveProjects, setLiveProjects] = useState([]);
  const [tbaProjects, setTbaProjects] = useState([]); // for ProjectCardDisabled

  function getLiveProjects() {
    const p1 = {
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
    return [p1];
  }

  useEffect(() => {
    setLiveProjects(getLiveProjects());
  }, []);

  return (
    <div className="container p-4 mx-auto xl:max-w-7xl lg:p-8">
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
