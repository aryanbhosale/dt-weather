import axios from "axios";
import getDBPool from "../db/db.js";

const createParameters = (count) => {
  let params = [];
  for (let i = 1; i <= count; i++) params.push(`$${i}`);
  return params.join(",");
};

export const getDataFromDB = async () => {
  const pool = getDBPool();
  let client;
  try {
    client = await pool.connect();
    const fetchQuery = "SELECT * FROM public.weather ORDER BY date DESC LIMIT 1";
    const { rows } = await client.query(fetchQuery);
    return rows;
  } catch (e) {
    console.log(`Error fetching from DB: `, e);
  } finally {
    client && client.release();
    pool && pool.end();
  }
};

export const insertDataIntoDB = async (
  max_temp,
  min_temp,
  avg_temp,
  max_wind,
  total_precip,
  total_snow,
  avg_visiblilty,
  avg_humidity,
  uv_index
) => {
  const pool = getDBPool();
  let client;

  try {
    client = await pool.connect();

    const weatherData = {
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
      data: weatherData
    }
      
    const res = await axios.post("http://127.0.0.1:5000/model/predict", payload)

    console.log(res.data.condition)

    let columns = [
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
      "condition",
    ];

    let values = [
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

    const paramsQuery = createParameters(columns.length);
    const insertQuery = `INSERT INTO public.weather ("${columns.join(
        '","'
    )}") VALUES(${paramsQuery}) ON CONFLICT DO NOTHING`;

    await client.query(insertQuery, values);

    const fetchQuery = `SELECT * FROM public.weather ORDER BY date DESC LIMIT 1`

    const {rows} = await client.query(fetchQuery)

    return rows
  } catch (e) {
    console.log(`Error in inserting to DB: `, e);
  }
};
