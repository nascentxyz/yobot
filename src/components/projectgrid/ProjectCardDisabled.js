import React from "react";

function ProjectCardDisabled({ project }) {
  return (
    <div className="flex flex-col pb-3 overflow-hidden bg-gray-800 rounded shadow-sm  pointer-events-none">
      <div className="flex-grow w-full text-center ">
        <a
          href="javascript:void(0)"
          className="block mb-5 -mx-2 -mt-2 transition duration-200 ease-out origin-bottom transform hover:scale-105 hover:shadow-xl active:shadow active:opacity-50"
        >
          <img
            src={project.previewImageSrc}
            alt="Photo"
            className="inline-block rounded filter grayscale blur"
          />
        </a>
        <h3 className="text-lg font-semibold text-gray-200">COMING SOON</h3>
      </div>
    </div>
  );
}

export default ProjectCardDisabled;
