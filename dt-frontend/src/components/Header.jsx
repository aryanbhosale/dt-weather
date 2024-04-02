import snowicon from "../assets/snowy.png";
import rainyicon from "../assets/rainy.png";
import calendaricon from "../assets/calendar-regular.svg";
import clockicon from "../assets/clock-regular.svg";
import orbicon from "../assets/crystal-ball.png";
import { format } from "date-fns";

const Header = ({
  condition,
  forecastWeather,
  setSelectedWeather,
  date,
  avg_temp,
}) => {
  return (
    <div className="flex divide-x-2 divide-gray-800 h-32 flex-row w-full items-center justify-center text-center sticky inset-x-0 top-0 z-30 border-b border-gray-700 bg-black/75 backdrop-blur-sm transition-all rounded-2xl">
      <div
        className="flex justify-center items-center text-center w-full h-full cursor-pointer hover:bg-gray-800 active:bg-slate-950 transition-all"
        onClick={() => setSelectedWeather(condition)} //format to represent number as a condition
      >
        <div className="flex flex-row justify-around h-full w-full pt-5">
          <div>
            <div className="text-lg border border-gray-700 flex flex-row justify-center">
              Current Conditions{" "}
              <span className="p-2">
                <img src={clockicon} className="h-4 w-4" alt="Clock Icon" />
              </span>
            </div>
            <div className="flex flex-row justify-center space-x-20 mt-5">
              <p>{avg_temp} °C</p>
              <div className="flex flex-col justify-start">
                <div className="flex flex-row space-x-2 justify-center">
                  <p>{condition} - Number corresponds to a condition</p>{" "}
                  <span>
                    <img src={snowicon} className="h-5 w-5" alt="Snow Icon" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col  border-gray-700">
              <div className="flex justify-center space-y-10">
                <img
                  src={calendaricon}
                  className="h-5 w-5"
                  alt="Calendar Icon"
                />
              </div>
              <p>{format(new Date(date), "dd MMM, yyyy - HH:mm")}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex justify-center items-center text-center w-full h-full cursor-pointer hover:bg-gray-800 active:bg-slate-950 transition-all"
        onClick={() => setSelectedWeather(forecastWeather)}
      >
        <div className="flex flex-row justify-around h-full w-full pt-5">
          <div>
            <div className="text-lg border border-gray-700 flex flex-row justify-center">
              Forecast
              <span className="p-2">
                <img src={orbicon} className="h-4 w-4" alt="Orb Icon" />
              </span>
            </div>
            <div className="flex flex-row justify-center space-x-20 mt-5">
              <p>15 degrees</p>
              <div className="flex flex-col justify-start">
                <div className="flex flex-row space-x-2 justify-center">
                  <p>Rain</p>{" "}
                  <span>
                    <img src={rainyicon} className="h-5 w-5" alt="Rain Icon" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
