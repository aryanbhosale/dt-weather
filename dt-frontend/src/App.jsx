import Header from "./components/Header";
import Render from "./components/Render";
import Parameters from "./components/Parameters";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [currentWeather, setCurrentWeather] = useState("Snow");
  const [forecastWeather, setForecastWeather] = useState("Rain");
  const [selectedWeather, setSelectedWeather] = useState(currentWeather);
  const [allData, setAllData] = useState(null); // State to store all fetched data

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
  }, []); 

  console.log(allData)
  

// avg_humidity
// avg_temp (c)
// avg_visibility (km)
// chance_of_rain
// chance_of_snow
// condition
// date
// location
// max_temp (c)
// max_wind (kph)
// min_temp (c)
// total_precip (mm)
// total_snow (cm)
// uv_index
// will_it_rain
// will_it_snow

  return (
    <div className="flex flex-col h-full w-full justify-center items-center bg-[#030712]">
      <Header
        currentWeather={currentWeather}
        forecastWeather={forecastWeather}
        setSelectedWeather={setSelectedWeather}
      />
      <div className="flex flex-row w-full justify-center items-center divide-x-2 divide-gray-800">
        <Render selectedWeather={selectedWeather} />
        <Parameters
          avg_humidity={5}
          avg_temp={15}
          avg_visibility={8}
          chance_of_rain={10}
          chance_of_snow={20}
          condition={30}
          max_temp={30}
          max_wind={30}
          min_temp={30}
          total_precip={30}
          total_snow={30}
          uv_index={30}
          will_it_rain={30}
          will_it_snow={30}
        />
      </div>
    </div>
  );
}

export default App;
