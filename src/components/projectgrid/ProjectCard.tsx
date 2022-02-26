import React from "react";
import Image from "next/image";

const ProjectCard = ({ project, isTestnet }) => {
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
      <div className="flex flex-col pb-3 overflow-hidden bg-gray-800 rounded shadow-sm">
        <div className="flex-grow w-full text-center ">
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
          {isTestnet ? (
            <div className="hidden mt-2 px-2 py-1 text-xs font-semibold leading-4 text-red-700 bg-red-200 rounded-full md:inline-block">
              Testnet
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
