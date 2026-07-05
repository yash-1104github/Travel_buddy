import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import tripsRouter from "./routes/trips.js";
import communityTripsRouter from "./routes/communityTrips.js";
import aiRouter from "./routes/ai.js";
import photosRouter from "./routes/photos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json({ limit: "10mb" }));

await connectDB();

app.use("/api/trips", tripsRouter);
app.use("/api/community-trips", communityTripsRouter);
app.use("/api/ai", aiRouter);
app.use("/api/photos", photosRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

console.log(PORT);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
