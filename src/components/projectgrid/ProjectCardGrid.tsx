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
    <div className="container p-4 mx-auto xl:max-w-7xl lg:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {liveProjects.length + tbaProjects.length > 0 ? (
          liveProjects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                project={project}
                isTestnet={project.network == 5}
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
