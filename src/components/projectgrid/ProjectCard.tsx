import React from "react";
import Image from "next/image";

const ProjectCard = ({ project, chainId }) => {
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

  let label = "Mainnet";

  switch (chainId) {
    case 3:
      label = "Ropsten";
    case 4:
      label = "Rinkeby";
    case 5:
      label = "Goerli";
    default:
      break;
  }

  return (
    <a href={projectIdLink}>
      <div className="flex flex-col overflow-hidden bg-gray-800 rounded shadow-sm">
        <div
          className="flex-grow w-full text-center block pb-6 -mt-2 pt-10 transition duration-200 ease-out origin-bottom transform hover:scale-105 hover:shadow-xl active:shadow active:opacity-50"
        >
          <Image
            src={project.image_src}
            alt="Photo"
            className="inline-block rounded"
            width={100}
            height={100}
          />
          <h3 className="text-lg font-semibold text-gray-200">
            {project.title}
          </h3>
          <h4 className="text-sm font-semibold text-gray-600">{dateStr}</h4>
          {chainId != 1 ? (
            <div className="hidden mt-2 px-2 py-1 text-xs font-semibold leading-4 text-red-700 bg-red-200 rounded-full md:inline-block">
              {label}
            </div>
          ) : (
            <div className="hidden mt-2 px-2 py-1 text-xs font-semibold leading-4 text-green-700 bg-green-200 rounded-full md:inline-block">
              {label}
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
