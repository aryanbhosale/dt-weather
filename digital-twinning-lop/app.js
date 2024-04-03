import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import router from "./routers/sensorRouter.js";

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => { //setting CORS headers before handling routes, these do not send a response, but rather modify it, so that whenever we send a response, it has these headers
  res.header("Access-Control-Allow-Origin", '*') //(Initially it was Not-Allowed but now we set it to Allowed, these headers need a value so we give * as a value so that all the URLs are allowed - you could also give https://devsoc.club but typically RESTful APIs allow all the URLs to have access!)
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization') //these are some of the default headers than need to be added in order to avoid the CORS error, you can read about each one of them online
  if(req.method === "OPTIONS") { //whenever you send a GET, DELETE, PATCH, POST, or a PUT request, the browser always responds with an OPTIONS method which is inevitable, thus, to overcome this, we set a custom header for this too
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({})
  }
  next(); //to end our middleware if we're not returning immediately due to receiving the OPTIONS request so that the other routes can't take over
});

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.json({ msg: "Ping successful" }));

app.use("/sensor", router);

app.listen(PORT, async () => console.log(`Server listening to port: ${PORT}`));
