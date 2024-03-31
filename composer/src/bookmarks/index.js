import serverless from "serverless-http";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Bookmarks" });
});

export const handler = serverless(app);
