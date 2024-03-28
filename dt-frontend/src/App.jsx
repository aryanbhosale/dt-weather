import Header from './components/Header'
import Render from './components/Render'
import Parameters from './components/Parameters'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [currentWeather, setCurrentWeather] = useState('Snow')
  const [forecastWeather, setForecastWeather] = useState('Rain')
  const [selectedWeather, setSelectedWeather] = useState(currentWeather)
  return (
    // main div container
    <div className="flex flex-col h-full w-full justify-center items-center bg-[#030712]">
      {/* Header Component Container */}
      <Header
        currentWeather={currentWeather}
        forecastWeather={forecastWeather}
        setSelectedWeather={setSelectedWeather}
      />
      {/* Main page below header container */}
      <div className="flex flex-row w-full justify-center items-center divide-x-2 divide-gray-800">
        {/* 3D renderer component */}
        <Render selectedWeather={selectedWeather} />
        {/* Parameter display component */}

        <Parameters
          MaxTemp={5}
          MaxWind={15}
          MinTemp={8}
          AvgTemp={10}
          AvgVisibility={20}
          AvgHum={30}
          TotalPer={30}
          TotalSnow={30}
        />
      </div>
    </div>
  )
}

export default App
