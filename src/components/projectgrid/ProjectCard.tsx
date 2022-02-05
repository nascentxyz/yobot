import React from "react";
import Image from "next/image";

const ProjectCard = ({ project }) => {
  const projectIdLink = "/projects/" + project.id;

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const dateStr = new Date(project.launch_time).toLocaleDateString(
    "en-US",
    // @ts-ignore
    options
  );

  return (
    <a href={projectIdLink}>
      <div className="flex flex-col pb-3 overflow-hidden rounded shadow-sm bg-yobotblack">
        <div className="flex-grow w-full text-center">
          <a
            href={projectIdLink}
            className="block mb-5 -mx-2 -mt-2 transition duration-200 ease-out origin-bottom transform hover:scale-105 hover:shadow-xl active:shadow active:opacity-50"
          >
            <Image
              src={project.image_src}
              alt="Photo"
              className="inline-block rounded"
              width={100}
              height={100}
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
