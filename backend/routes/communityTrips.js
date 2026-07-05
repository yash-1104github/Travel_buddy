import { Router } from "express";
import { CommunityTrip } from "../models/CommunityTrip.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const trip = req.body;
    const tripId = trip.id;

    if (!tripId) {
      return res.status(400).json({ error: "Trip id is required" });
    }

    const saved = await CommunityTrip.findByIdAndUpdate(
      tripId,
      { ...trip, _id: tripId, id: tripId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(saved);
  } catch (error) {
    console.error("Share community trip error:", error);
    res.status(500).json({ error: "Failed to share trip to community" });
  }
});

router.get("/", async (_req, res) => {
  try {
    const trips = await CommunityTrip.find().lean();
    res.json(trips);
  } catch (error) {
    console.error("List community trips error:", error);
    res.status(500).json({ error: "Failed to fetch community trips" });
  }
});

export default router;
