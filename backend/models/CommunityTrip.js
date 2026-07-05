import mongoose from "mongoose";

const communityTripSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userEmail: { type: String },
    userSelection: { type: mongoose.Schema.Types.Mixed },
    tripData: { type: mongoose.Schema.Types.Mixed },
    id: { type: String },
  }
);


export const CommunityTrip = mongoose.model(
  "CommunityTrip",
  communityTripSchema,
  "communitytrips"
);
