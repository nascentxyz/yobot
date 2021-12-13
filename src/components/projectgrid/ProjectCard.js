import React from "react";

const ProjectCard = ({ project }) => {
  const projectIdLink = "/projects/" + project.projectId;

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const dateStr = project.launchTime.toLocaleDateString("en-US", options);

  return (
    <a href={projectIdLink}>
      <div className="flex flex-col pb-3 overflow-hidden bg-gray-800 rounded shadow-sm">
        <div className="flex-grow w-full text-center ">
          <a
            href={projectIdLink}
            className="block mb-5 -mx-2 -mt-2 transition duration-200 ease-out origin-bottom transform hover:scale-105 hover:shadow-xl active:shadow active:opacity-50"
          >
            <img
              src={project.previewImageSrc}
              alt="Photo"
              className="inline-block rounded"
            />
          </a>
          <h3 className="text-lg font-semibold text-gray-200">
            {project.title}
          </h3>
          <h4 className="text-sm font-semibold text-gray-600">{dateStr}</h4>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
