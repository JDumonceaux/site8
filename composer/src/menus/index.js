import compression from "compression";
import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import { menuRouter } from "./routes/menuRouter.js";

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

// set up rate limiter
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
  standardHeaders: "draft-7",
  legacyHeaders: false,
  statusCode: 429,
  message: "Rate limit reached",
});

app.use("/api/files", fileRouter, limiter);
app.use("/api/menus", menuRouter);
app.use("/api/page", pageRouter, limiter);
app.use("/api/pages", pagesRouter);

export const handler = serverless(app);
