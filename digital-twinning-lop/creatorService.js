import axios from "axios";
import getDBPool from "./db/db.js"

const createParameters = (count) => {
  let params = [];
  for (let i = 1; i <= count; i++) params.push(`$${i}`);
  return params.join(",");
};

const insertData = async () => {
    let max_temp = 30 + Math.random() * 10
    let min_temp = max_temp - Math.random() * 5
    let avg_temp = (max_temp + min_temp) / 2
    let max_wind = 15 + Math.random() * 10
    let total_precip = 0
    let total_snow = 0
    let avg_visiblilty = 10
    let avg_humidity = Math.floor(50 + Math.random(20))
    let uv_index = Math.floor(6 + Math.random() * 3)

    const data = {
      max_temp,
      min_temp,
      avg_temp,
      max_wind,
      total_precip,
      total_snow,
      avg_visiblilty,
      avg_humidity,
      uv_index
    };

    const payload = {
      data: data
    }
    
    const res = await axios.post("http://127.0.0.1:5000/model/predict", payload)

    console.log("got", res.data.condition)

    const columns = [
      "date",
      "max_temp",
      "min_temp",
      "avg_temp",
      "max_wind",
      "total_precip",
      "total_snow",
      "avg_visibility",
      "avg_humidity",
      "uv_index",
      "condition"
    ];

    const values = [
      new Date(),
      max_temp,
      min_temp,
      avg_temp,
      max_wind,
      total_precip,
      total_snow,
      avg_visiblilty,
      avg_humidity,
      uv_index,
      res.data.condition
    ];

    const pool = getDBPool()
    const client = await pool.connect()

    const paramsQuery = createParameters(columns.length);
    const insertQuery = `INSERT INTO public.weather ("${columns.join(
        '","'
    )}") VALUES(${paramsQuery}) ON CONFLICT DO NOTHING`;

    await client.query(insertQuery, values);

    console.log("Inserted for", values)
};

setInterval(insertData, 5000);