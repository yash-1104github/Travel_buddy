import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function generateTripPlan(prompt) {
  const { data } = await axios.post(`${API_BASE}/api/ai/generate-trip`, {
    prompt,
  });

  return data.text;
}
