import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const createTrip = (trip) => api.post("/api/trips", trip);

export const getTrip = (id) => api.get(`/api/trips/${id}`);

export const getUserTrips = (userEmail) => api.get("/api/trips", { params: { userEmail } });

export const deleteTrip = (id) => api.delete(`/api/trips/${id}`);

export const shareToCommunity = (trip) => api.post("/api/community-trips", trip);

export const getCommunityTrips = () => api.get("/api/community-trips");
