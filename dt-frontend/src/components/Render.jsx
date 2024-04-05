import React from "react";
import heavyRain from "../assets/gifs/heavy-rain.gif";
import lightRain from "../assets/gifs/light-rain.gif";
import moderateRain from "../assets/gifs/moderate-rain.gif";
import mistFog from "../assets/gifs/mist_fog.gif";
import overcast from "../assets/gifs/overcast.gif";
import partlyCloudyCloudy from "../assets/gifs/partly-cloudy_cloudy.gif";
import patchyRain from "../assets/gifs/patchy-rain.gif";
import sunny from "../assets/gifs/sunny.gif";
import thunderyOutbreaks from "../assets/gifs/thundery-outbreaks.gif";

const Render = ({ condition }) => {
  let imageSrc;
  let altText;

  switch (condition) {
    case "Partly cloudy/Cloudy":
      imageSrc = partlyCloudyCloudy;
      altText = "Partly cloudy/Cloudy";
      break;
    case "Sunny":
      imageSrc = sunny;
      altText = "Sunny";
      break;
    case "Patchy rain":
      imageSrc = patchyRain;
      altText = "Patchy rain";
      break;
    case "Moderate rain":
      imageSrc = moderateRain;
      altText = "Moderate rain";
      break;
    case "Heavy rain":
      imageSrc = heavyRain;
      altText = "Heavy rain";
      break;
    case "Light rain":
      imageSrc = lightRain;
      altText = "Light rain";
      break;
    case "Thundery outbreaks":
      imageSrc = thunderyOutbreaks;
      altText = "Thundery outbreaks";
      break;
    case "Mist/Fog":
      imageSrc = mistFog;
      altText = "Mist/Fog";
      break;
    case "Overcast":
      imageSrc = overcast;
      altText = "Overcast";
      break;
    default:
      imageSrc = null;
      altText = "";
  }

  return (
    <div className="w-9/12 flex h-screen items-center text-center justify-center">
      {imageSrc && (
        <img src={imageSrc} alt={altText} className="w-full h-full" />
      )}
    </div>
  );
};

export default Render;