import Header from "./components/Header";
import Render from "./components/Render";
import Parameters from "./components/Parameters";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [currentWeather, setCurrentWeather] = useState("Snow");
  const [forecastWeather, setForecastWeather] = useState("Rain");
  const [selectedWeather, setSelectedWeather] = useState(currentWeather);
  const [allData, setAllData] = useState([{}]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/sensor/fetch-data");
        setAllData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [allData]);
  
  console.log(allData[0])

//   {
//     "max_temp": "33.2",
//     "min_temp": "21.0",
//     "avg_temp": "27.0",
//     "max_wind": "20.9",
//     "total_precip": "0.0",
//     "total_snow": "0.0",
//     "avg_visibility": "10.0",
//     "avg_humidity": "32",
//     "condition": "7",
//     "uv_index": "8.0",
//     "date": "2024-04-02T12:10:20.428Z"
// }


  return (
    <div className="flex flex-col h-full w-full justify-center items-center bg-[#030712]">
      <Header
        date={allData[0].date || "2024-04-02T12:10:20.428Z"}
        avg_temp={allData[0].avg_temp || ""}
        condition={allData[0].condition || ""}
        forecastWeather={forecastWeather}
        setSelectedWeather={setSelectedWeather}
      />
      <div className="flex flex-row w-full justify-center items-center divide-x-2 divide-gray-800">
        <Render selectedWeather={selectedWeather} />
        { <Parameters
          avg_humidity={allData[0].avg_humidity || ""}
          avg_temp={allData[0].avg_temp || ""}
          avg_visibility={allData[0].avg_visibility || ""}
          condition={allData[0].condition || ""}
          max_temp={allData[0].max_temp || ""}
          max_wind={allData[0].max_wind || ""}
          min_temp={allData[0].min_temp || ""}
          total_precip={allData[0].total_precip || ""}
          total_snow={allData[0].total_snow || ""}
          uv_index={allData[0].uv_index || ""}
        /> }
      </div>
    </div>
  );
}

export default App;
