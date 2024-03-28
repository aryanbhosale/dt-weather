import React, { useState } from "react";

export default function Parameters({
  avg_humidity,
  avg_temp,
  avg_visibility,
  chance_of_rain,
  chance_of_snow,
  condition,
  max_temp,
  max_wind,
  min_temp,
  total_precip,
  total_snow,
  uv_index,
  will_it_rain,
  will_it_snow,
}) {
  const [parameters, setParameters] = useState({
    avg_humidity,
    avg_temp,
    avg_visibility,
    chance_of_rain,
    chance_of_snow,
    condition,
    max_temp,
    max_wind,
    min_temp,
    total_precip,
    total_snow,
    uv_index,
    will_it_rain,
    will_it_snow,
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleChange = (event) => {
    setParameters({
      ...parameters,
      [event.target.name]: event.target.value,
    });
    setShowUpdateButton(true);
  };

  const handleUpdate = () => {
    console.log(parameters);
    setShowUpdateButton(false);
  };

  return (
    <div className="w-1/4 h-screen items-center text-center justify-center">
      <div className="px-6 py-4 text-xl border-b border-gray-800">
        Weather Parameters
      </div>
      <div className="px-6 py-4">
        <div className="mb-4">
          <ul className="list-none">
            {Object.entries(parameters).map(([key, value]) => (
              <li key={key} className="flex items-center mb-2 cursor-default">
                <span className="mx-1">{key}</span>
                <span className="mx-1">
                  <input
                    className="bg-inherit opacity-45 width-1/4"
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                  />
                </span>
              </li>
            ))}
          </ul>
          {showUpdateButton && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdate}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
