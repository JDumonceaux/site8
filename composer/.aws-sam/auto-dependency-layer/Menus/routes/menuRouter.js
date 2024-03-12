import express from "express";

export const menuRouter = express.Router();
menuRouter.get("/", async (_req, res) => {
  try {
    res.status(200).json({ response: "Menusxxx" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
