import Header from "./components/Header";
import Render from "./components/Render";
import Parameters from "./components/Parameters";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [currentWeather, setCurrentWeather] = useState("Snow");
  const [forecastWeather, setForecastWeather] = useState("Rain");
  const [selectedWeather, setSelectedWeather] = useState(currentWeather);
  const [allData, setAllData] = useState(null);
  const latestRef = useRef(0); // Using useRef for latest
  
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
  
    const intervalId = setInterval(() => {
      latestRef.current = (latestRef.current + 1) % (allData ? allData.length : 1);
      setSelectedWeather(allData?.[latestRef.current]?.condition || currentWeather);
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [allData, currentWeather]);

  console.log(allData?.[latestRef.current]?.["avg_temp (c)"]);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center bg-[#030712]">
      <Header
        date={allData ? allData[latestRef.current]?.date : ""}
        avg_temp={allData ? allData[latestRef.current]?.["avg_temp (c)"] : ""}
        currentWeather={currentWeather}
        forecastWeather={forecastWeather}
        setSelectedWeather={setSelectedWeather}
      />
      <div className="flex flex-row w-full justify-center items-center divide-x-2 divide-gray-800">
        <Render selectedWeather={selectedWeather} />
        <Parameters
          avg_humidity={allData?.[latestRef.current]?.avg_humidity || 5}
          avg_temp={allData?.[latestRef.current]?.["avg_temp (c)"] || 15}
          avg_visibility={allData?.[latestRef.current]?.avg_visibility || 8}
          chance_of_rain={allData?.[latestRef.current]?.chance_of_rain || 10}
          chance_of_snow={allData?.[latestRef.current]?.chance_of_snow || 20}
          condition={allData?.[latestRef.current]?.condition || 30}
          max_temp={allData?.[latestRef.current]?.max_temp || 30}
          max_wind={allData?.[latestRef.current]?.max_wind || 30}
          min_temp={allData?.[latestRef.current]?.min_temp || 30}
          total_precip={allData?.[latestRef.current]?.total_precip || 30}
          total_snow={allData?.[latestRef.current]?.total_snow || 30}
          uv_index={allData?.[latestRef.current]?.uv_index || 30}
          will_it_rain={allData?.[latestRef.current]?.will_it_rain || 30}
          will_it_snow={allData?.[latestRef.current]?.will_it_snow || 30}
        />
      </div>
    </div>
  );
}

export default App;
