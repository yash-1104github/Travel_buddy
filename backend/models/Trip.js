import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userEmail: { type: String, required: true, index: true },
    userSelection: { type: mongoose.Schema.Types.Mixed },
    tripData: { type: mongoose.Schema.Types.Mixed },
    id: { type: String },
  }
);

export const Trip = mongoose.model("Trip", tripSchema, "tripinfo");
