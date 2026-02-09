import express from "express";
import { searchAllIndices } from "../agent/searchService.js";
import { reasonOverResults } from "../agent/reasoningService.js";
import { composeResponse } from "../agent/responseComposer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.json({
      reply: "Please enter a valid question or search query.",
    });
  }

  try {
    // 🔍 Retrieve from Algolia (retrieve-before-respond)
    const retrievedData = await searchAllIndices(message);

    const isEmpty =
      retrievedData.products.length === 0 &&
      retrievedData.articles.length === 0 &&
      retrievedData.faqs.length === 0;

    // 🧯 Graceful fallback when nothing is found
    if (isEmpty) {
      return res.json({
        reply:
          "I couldn’t find relevant products or information. Try refining your request or using different keywords.",
      });
    }

    // 🧠 Reason over retrieved results
    const reasoned = reasonOverResults(retrievedData);

    // ✍️ Compose final conversational response
    const finalResponse = composeResponse(reasoned);

    res.json({ reply: finalResponse });
  } catch (err) {
    console.error("Chat route error:", err);
    res.status(500).json({
      reply: "Something went wrong while processing your request.",
    });
  }
});

export default router;