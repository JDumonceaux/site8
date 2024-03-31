import serverless from "serverless-http";
import express from "express";
import compression from "compression";
import { menuRouter } from "./routes/menuRouter.js";
import cors from "cors";

const app = express();
app.set("x-powered-by", false);
app.set("etag", false);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(compression());
app.use(cors());
app.use((_req, res, next) => {
  // Website you wish to allow to connect
  // res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use("/api/menus", menuRouter);

app.get("/", (req, res) => {
  res.json({ message: "Menus" });
});

export const handler = serverless(app);
