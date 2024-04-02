import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import router from "./routers/sensorRouter.js";

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => { 
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization') 
  if(req.method === "OPTIONS") { 
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({})
  }
  next(); 
});

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.json({ msg: "Ping successful" }));

app.use("/sensor", router);

app.listen(PORT, async () => console.log(`Server listening to port: ${PORT}`));
