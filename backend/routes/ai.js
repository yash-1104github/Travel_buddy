import { Router } from "express";
import { generateTripPlan } from "../services/openai.js";

const router = Router();

router.post("/generate-trip", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "prompt is required" });
  }

  try {
    const text = await generateTripPlan(prompt);
    res.json({ text });
  } catch (error) {
    console.error("OpenAI trip generation failed:", error);

    const status = error?.status ?? error?.response?.status;

    if (status === 429 || status === 503) {
      return res.status(status).json({
        error: "Service is overloaded. Please try again later.",
      });
    }

    if (error.message === "OPENAI_API_KEY is not configured") {
      return res.status(500).json({ error: "OpenAI API key is not configured" });
    }

    res.status(500).json({ error: "Failed to generate trip plan" });
  }
});

export default router;
