import { Router } from "express";
import { searchPhoto, trackPhotoDownload } from "../services/unsplash.js";

const router = Router();

router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "query is required" });
  }

  try {
    const photo = await searchPhoto(query);

    if (!photo) {
      return res.status(404).json({ error: "No photo found" });
    }

    res.json(photo);
  } catch (error) {
    console.error("Unsplash search error:", error);

    if (error.message === "UNSPLASH_ACCESS_KEY is not configured") {
      return res.status(500).json({ error: "Unsplash API key is not configured" });
    }

    if (error.status === 403 || error.status === 429) {
      return res.status(error.status).json({
        error: "Photo service rate limit exceeded. Please try again later.",
      });
    }

    res.status(500).json({ error: "Failed to search photos" });
  }
});

router.post("/track-download", async (req, res) => {
  const { downloadLocation } = req.body;

  if (!downloadLocation || typeof downloadLocation !== "string") {
    return res.status(400).json({ error: "downloadLocation is required" });
  }

  if (!downloadLocation.startsWith("https://api.unsplash.com/")) {
    return res.status(400).json({ error: "Invalid downloadLocation" });
  }

  try {
    await trackPhotoDownload(downloadLocation);
    res.json({ ok: true });
  } catch (error) {
    console.error("Unsplash download tracking error:", error);

    if (error.status === 403 || error.status === 429) {
      return res.status(error.status).json({
        error: "Photo service rate limit exceeded. Please try again later.",
      });
    }

    res.status(500).json({ error: "Failed to track photo download" });
  }
});

export default router;
