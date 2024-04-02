import getDBPool from "../db/db.js";

const createParameters = (params) => {
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
  client,
  date,
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
  try {
    // Columns and values to be inserted
    let columns = [
      "date",
      "max_temp",
      "min_temp",
      "avg_temp",
      "max_wind",
      "total_precip",
      "total_snow",
      "avg_visiblilty",
      "avg_humidity",
      "uv_index",
      "condition",
    ];

    let values = [
      date,
      max_temp,
      min_temp,
      avg_temp,
      max_wind,
      total_precip,
      total_snow,
      avg_visiblilty,
      avg_humidity,
      uv_index,
    ];

    if (!date) {
      columns = columns.filter((col) => col !== "date");
      values = values.filter((val) => val !== date);
    }

    const { data } = await axios.post(
      `${process.env.ML_SERVER}/model/predict`,
      {
        data: values.filter((val) => val !== date),
      }
    );

    const paramsQuery = createParameters([...values, data.condition]);
    const insertQuery = `INSERT INTO public.sensor_data (${[...columns].join(
      ","
    )}) VALUES(${paramsQuery}) ON CONFLICT DO NOTHING`;
    await client.query(insertQuery, values);
  } catch (e) {
    console.log(`Error in inserting to DB: `, e);
  }
};
