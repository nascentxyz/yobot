import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useYobot } from "src/contexts/YobotContext";

const EmptyAddress = "0x0000000000000000000000000000000000000000";

const ProjectDetails = ({ props }) => {
  const { yobot, address, actions, chainId, refreshEvents } = useYobot();

  const highestBid =
    props.project.highestBidInWei == "-"
      ? "-"
      : props.project.highestBidInWei
      ? props.project.highestBidInWei.toString()
      : "0";

  const calculateTimeLeft = () => {
    let difference = props.project.launch_time
      ? new Date(props.project.launch_time) - new Date()
      : 0;

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
    <div className="flex flex-col overflow-hidden bg-gray-700 rounded-xl shadow-sm sm:mx-0 sm:max-w-sm text-left ">
      <div className="flex-grow w-full p-5 space-y-4 ">
        {/* NFT image, title and description Start */}
        <div className="flex flex-col items-start">
          <Image
            src={
              props.project.image_src
                ? props.project.image_src
                : "/etherscan.png"
            }
            alt="NFT Project Image"
            className="flex-none inline-block w-full mb-3 sm:w-3/12"
            width={100}
            height={100}
          />

          <div className="flex-grow text-lg">
            <p className="mb-1">
              <a
                target="_blank"
                rel="noreferrer"
                href={props.project.website}
                className="font-semibold text-gray-200 hover:text-indigo-400"
              >
                {props.project.title}
              </a>
              {/* <span className="text-gray-500 sm:hidden">· 03h:13m:34s</span> */}
            </p>
            <p className="mb-2 text-sm">{props.project.description}</p>
          </div>
        </div>
        {/* NFT image, title and description End */}

        {/* Countdown Start */}

        <div className="grid visible hidden grid-cols-1 gap-4 sm:inline-block">
          <div className="flex flex-col overflow-hidden bg-gray-800 rounded shadow-sm">
            <div className="flex-grow w-full p-5">
              <dl>
                <dt className="text-2xl font-semibold">
                  <span>{timeLeft.days}d </span>
                  <span>{timeLeft.hours}h </span>

                  <span>{timeLeft.minutes}m </span>

                  <span>{timeLeft.seconds}s</span>
                </dt>
                <dd className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Countdown to Mint
                </dd>
              </dl>
            </div>
          </div>

          {/* Countdown End */}

          {/* Highest Bid Card Start */}

          <div className="grid grid-cols-2 ">
            <div className="flex flex-col overflow-hidden bg-gray-700 rounded shadow-sm">
              <div className="flex-grow w-full p-5">
                <dl>
                  <dt className="text-2xl font-semibold">
                    {props.gettingActions || address == EmptyAddress
                      ? "-"
                      : highestBid}
                  </dt>
                  <dd className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                    Highest Bid
                  </dd>
                </dl>
              </div>
            </div>

            {/* Highest Bid Card End */}

            {/* Total Bids Card Start */}
            <div className="flex flex-col overflow-hidden bg-gray-700 rounded shadow-sm">
              <div className="flex-grow w-full p-5">
                <dl>
                  <dt className="text-2xl font-semibold">
                    {props.gettingActions || address == EmptyAddress
                      ? "-"
                      : props.project.totalBids}
                  </dt>
                  <dd className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                    Total Bids
                  </dd>
                </dl>
              </div>
            </div>
            {/* Total Bids Card End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
