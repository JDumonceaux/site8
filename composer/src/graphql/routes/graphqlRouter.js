import express from "express";
import { Logger } from "../utils/Logger.js";
import { MenuService } from "../services/MenuService.js";
export const graphQLRouter = express.Router();
graphQLRouter.get("/", async (_req, res) => {
  try {
    const menus = await new MenuService().getMenus();
    res.json(menus);
  } catch (error) {
    Logger.error(`graphQLRouter: get -> Error: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
