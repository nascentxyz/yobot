import React from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardDisabled from "./ProjectCardDisabled";
import { useEffect, useState } from "react";
import { Yobot } from "src/yobot-sdk";

function ProjectCardGrid() {
  const [liveProjects, setLiveProjects] = useState([]);
  const [tbaProjects, setTbaProjects] = useState([]); // for ProjectCardDisabled

  const fetchProjects = async () => {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // ** Set the projects ** //
    const { projects } = await response.json();
    setLiveProjects(
      projects.filter(
        (proj) => proj.visible && Yobot.isSupportedChain(proj.network)
      )
    );
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container p-4 mx-auto xl:max-w-screen-lg lg:p-8">
      <div className="flex flex-wrap lg:gap-8">
        {liveProjects.length + tbaProjects.length > 0 ? (
          liveProjects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                project={project}
                chainId={project.network}
              />
            );
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
