import React from 'react';
import Snow from '../assets/snow.gif';
import Rain from '../assets/rain.gif';

const Render = ({ selectedWeather }) => {
  if(selectedWeather === "Snow") {
    return (
      <div className='w-9/12 flex h-screen items-center text-center justify-center'>
          <img src={Snow} alt="Snow" className='w-full h-full' />
      </div>
    )
  } if(selectedWeather === "Rain") {
    return (
      <div className='w-9/12 flex h-screen items-center text-center justify-center'>
          <img src={Rain} alt="Rain" className='w-full h-full' />
      </div>
    )
  }
}

export default Render