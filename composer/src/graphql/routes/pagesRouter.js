import express from "express";
import { getFilePath } from "../utils/getFilePath.js";
import { Logger } from "../utils/Logger.js";
export const pagesRouter = express.Router();
pagesRouter.get("/", (_req, res) => {
  Logger.info(`pagesRouter: get ->`);
  res.sendFile(getFilePath("pagesIndex.json"));
});
