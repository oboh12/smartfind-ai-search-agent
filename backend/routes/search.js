import express from "express";
import { searchAllIndices } from "../agent/searchService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json({ products: [], articles: [], faqs: [] });
  }

  try {
    const results = await searchAllIndices(q);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;