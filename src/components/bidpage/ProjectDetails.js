import React from "react";
import { useEffect, useState } from "react";
import { useYobot } from "src/contexts/YobotContext";

const EmptyAddress = "0x0000000000000000000000000000000000000000";

const ProjectDetails = ({ props }) => {
  const { yobot, address, actions, chainId, refreshEvents } = useYobot();

  const highestBid =
    props.project.highestBidInWei == "-"
      ? "-"
      : yobot.web3.utils.fromWei(
          props.project.highestBidInWei.toString(),
          "ether"
        );

  const calculateTimeLeft = () => {
    let difference = props.project.launchTime - new Date();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col overflow-hidden text-left rounded-lg shadow-sm min-w-437 bg-zinc sm:mx-0 sm:w-437">
      <div className="flex-grow w-full p-5 space-y-4 ">
        {/* NFT image, title and description Start */}
        <div className="flex flex-col items-start">
          <img
            src={props.project.previewImageSrc}
            alt="NFT Project Image"
            className="flex-none inline-block w-full mb-6 sm:w-3/12"
          />

          <div className="flex-grow">
            <p className="mb-6">
              <a
                href={props.project.projectWebsite}
                className="text-lg font-semibold hover:text-yobotgreen"
              >
                {props.project.title}{" "}
                <span className="font-normal">
                  {" "}
                  | Base Mint Price: 0.1 ETH{" "}
                </span>
              </a>
              {/* <span className="text-gray-500 sm:hidden">· 03h:13m:34s</span> */}
            </p>

            <p className="mb-4 text-base leading-relaxed">
              {props.project.description}
            </p>
          </div>

          {/* BADGES */}
          <div className="flex justify-start mb-4">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-2">
              Generative
            </span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2">
              Placeholder
            </span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mr-2">
              Placeholder
            </span>
          </div>
          {/* END BADGES */}
        </div>
        {/* NFT image, title and description End */}
      </div>
      <div className="grid visible hidden grid-cols-1 gap-4 sm:inline-block">
        <div className="grid grid-cols-3 p-4 bg-yobotblack">
          {/* Highest Bid Card Start */}
          <div className="flex flex-col overflow-hidden rounded shadow-sm">
            <div className="flex-grow w-full p-2">
              <dl>
                <dd className="text-lg font-semibold tracking-wider text-textgray">
                  Minting in
                </dd>
                <dt className="text-lg font-semibold text-white">
                  <span>{timeLeft.days}d </span>
                  <span>{timeLeft.hours}h </span>

                  <span>{timeLeft.minutes}m </span>

                  <span>{timeLeft.seconds}s</span>
                </dt>
              </dl>
            </div>
          </div>
          {/* DOUBLE */}
          <div className="flex flex-col overflow-hidden rounded shadow-sm">
            <div className="flex-grow w-full p-2">
              <dl>
                <dd className="text-lg font-semibold tracking-wider text-textgray">
                  Highest Bid
                </dd>
                <dt className="text-lg font-semibold text-white">
                  {props.gettingActions || address == EmptyAddress
                    ? "-"
                    : highestBid}
                </dt>
              </dl>
            </div>
          </div>

          {/* Highest Bid Card End */}

          {/* Total Bids Card Start */}
          <div className="flex flex-col overflow-hidden rounded shadow-sm">
            <div className="flex-grow w-full p-2">
              <dl>
                <dd className="text-lg font-semibold tracking-wider text-textgray ">
                  Bid Count
                </dd>
                <dt className="text-lg font-semibold text-white">
                  {props.gettingActions || address == EmptyAddress
                    ? "-"
                    : props.project.totalBids}
                </dt>
              </dl>
            </div>
          </div>
          {/* Total Bids Card End */}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
