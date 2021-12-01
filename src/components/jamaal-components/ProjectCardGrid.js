import React from 'react';
import ProjectCard from './ProjectCard';
import ProjectCardDisabled from './ProjectCardDisabled';


function ProjectCardGrid() {

  return (
  <div className="container p-4 mx-auto xl:max-w-7xl lg:p-8">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <ProjectCard/>
        <ProjectCardDisabled/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
      </div>
    </div>
  )
}

export default ProjectCardGrid;