import React from "react";
import { format } from "date-fns";

import heavyRainIcon from "../assets/icons/heavy-rain.png";
import lightRainIcon from "../assets/icons/light-rain.png";
import moderateRainIcon from "../assets/icons/moderate-rain.png";
import mistFogIcon from "../assets/icons/mist_fog.png";
import overcastIcon from "../assets/icons/overcast.png";
import partlyCloudyCloudyIcon from "../assets/icons/partly-cloudy_cloudy.png";
import patchyRainIcon from "../assets/icons/patchy-rain.png";
import sunnyIcon from "../assets/icons/sunny.png";
import thunderyOutbreaksIcon from "../assets/icons/thundery-outbreaks.png";
import calendarIcon from "../assets/icons/calendar-regular.svg";
import clockIcon from "../assets/icons/clock-regular.svg";

const Header = ({ condition, date, avg_temp }) => {
  const getConditionIcon = (condition) => {
    switch (condition) {
      case "Heavy rain":
        return heavyRainIcon;
      case "Light rain":
        return lightRainIcon;
      case "Moderate rain":
        return moderateRainIcon;
      case "Mist/Fog":
        return mistFogIcon;
      case "Overcast":
        return overcastIcon;
      case "Partly cloudy/Cloudy":
        return partlyCloudyCloudyIcon;
      case "Patchy rain":
        return patchyRainIcon;
      case "Sunny":
        return sunnyIcon;
      case "Thundery outbreaks":
        return thunderyOutbreaksIcon;
      default:
        return null;
    }
  };

  return (
    <div className="flex divide-x-2 divide-gray-800 h-32 flex-row w-full items-center justify-center text-center sticky inset-x-0 top-0 z-30 border-b border-gray-700 bg-black/75 backdrop-blur-sm transition-all rounded-2xl">
      <div className="flex justify-center items-center text-center w-full h-full cursor-pointer hover:bg-gray-800 active:bg-slate-950 transition-all">
        <div className="flex flex-row justify-around h-full w-full pt-5">
          <div>
            <div className="text-lg border border-gray-700 flex flex-row justify-center">
              Predicted Climate{" "}
              <span className="p-2">
                <img src={clockIcon} className="h-4 w-4" alt="Clock Icon" />
              </span>
            </div>
            <div className="flex flex-row justify-center space-x-20 mt-5">
              <p>{avg_temp} °C</p>
              <div className="flex flex-col justify-start">
                <div className="flex flex-row space-x-2 justify-center">
                  <p>{condition}</p>{" "}
                  {getConditionIcon(condition) && (
                    <span>
                      <img
                        src={getConditionIcon(condition)}
                        className="h-5 w-5"
                        alt={`${condition} Icon`}
                      />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col  border-gray-700">
              <div className="flex justify-center space-y-10">
                <img
                  src={calendarIcon}
                  className="h-5 w-5"
                  alt="Calendar Icon"
                />
              </div>
              <p>{format(new Date(date), "dd MMM, yyyy - HH:mm")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;