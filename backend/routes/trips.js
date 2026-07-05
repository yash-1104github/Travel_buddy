import { Router } from "express";
import { Trip } from "../models/Trip.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { id, userEmail, userSelection, tripData } = req.body;

    if (!id || !userEmail) {
      return res.status(400).json({ error: "id and userEmail are required" });
    }

    const trip = await Trip.create({
      _id: id,
      id,
      userEmail,
      userSelection,
      tripData,
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error("Create trip error:", error);
    res.status(500).json({ error: "Failed to create trip" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ error: "userEmail query parameter is required" });
    }

    const trips = await Trip.find({ userEmail }).lean();
    res.json(trips);
  } catch (error) {
    console.error("List trips error:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).lean();

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    console.error("Get trip error:", error);
    res.status(500).json({ error: "Failed to fetch trip" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Delete trip error:", error);
    res.status(500).json({ error: "Failed to delete trip" });
  }
});

export default router;
