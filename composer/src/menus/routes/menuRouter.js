import express from "express";
import { Logger } from "../utils/Logger.js";
import { MenuService } from "../services/MenuService.js";
export const menuRouter = express.Router();
menuRouter.get("/", async (_req, res) => {
  try {
    const menus = await new MenuService().getMenus();
    res.json(menus);
  } catch (error) {
    Logger.error(`menuRouter: get -> Error: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
