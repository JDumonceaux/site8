import serverless from "serverless-http";
import express from "express";

const app = express();

console.log(`Start`);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on AWS Lambda!" });
});

export const handler = serverless(app);
