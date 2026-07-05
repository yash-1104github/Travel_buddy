import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

export const UNSPLASH_APP_NAME = "travel_buddy";

export const FALLBACK_PHOTO_URL =
  "https://placehold.co/800x600/e2e8f0/64748b?text=Travel+Photo";

export function withUnsplashUtm(url) {
  const parsed = new URL(url);
  parsed.searchParams.set("utm_source", UNSPLASH_APP_NAME);
  parsed.searchParams.set("utm_medium", "referral");
  return parsed.toString();
}

export async function searchPhoto(query) {
  const { data } = await axios.get(`${API_BASE}/api/photos/search`, {
    params: { query },
  });

  return data;
}

export async function trackPhotoDownload(downloadLocation) {
  await axios.post(`${API_BASE}/api/photos/track-download`, {
    downloadLocation,
  });
}
