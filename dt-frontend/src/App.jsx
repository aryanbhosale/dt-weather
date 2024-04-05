import Header from "./components/Header";
import Render from "./components/Render";
import Parameters from "./components/Parameters";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [allData, setAllData] = useState([{}]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/sensor/fetch-data");
        setAllData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [allData]);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center bg-[#030712]">
      <Header
        date={allData[0].date || "2024-04-02T12:10:20.428Z"}
        avg_temp={allData[0].avg_temp || ""}
        condition={allData[0].condition || ""}
      />
      <div className="flex flex-row w-full justify-center items-center divide-x-2 divide-gray-800">
        <Render condition={allData[0].condition || ""} />
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