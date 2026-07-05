const UNSPLASH_API = "https://api.unsplash.com";
const CACHE_TTL_MS = 1000 * 60 * 60;

const cache = new Map();

function getAccessKey() {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    throw new Error("UNSPLASH_ACCESS_KEY is not configured");
  }
  return key;
}

function getCached(query) {
  const entry = cache.get(query);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(query);
    return null;
  }
  return entry.data;
}

function setCache(query, data) {
  cache.set(query, { data, timestamp: Date.now() });
}

export async function trackPhotoDownload(downloadLocation) {
  if (!downloadLocation) {
    throw new Error("downloadLocation is required");
  }

  const accessKey = getAccessKey();
  const response = await fetch(downloadLocation, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  if (!response.ok) {
    const error = new Error("Unsplash download tracking failed");
    error.status = response.status;
    throw error;
  }
}

export async function searchPhoto(query) {
  const normalizedQuery = query?.trim().toLowerCase();
  if (!normalizedQuery) {
    throw new Error("query is required");
  }

  const cached = getCached(normalizedQuery);
  if (cached) {
    return cached;
  }

  const accessKey = getAccessKey();
  const params = new URLSearchParams({
    query: query.trim(),
    per_page: "1",
    orientation: "landscape",
  });

  const response = await fetch(`${UNSPLASH_API}/search/photos?${params}`, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  if (!response.ok) {
    const error = new Error("Unsplash search failed");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const photo = data.results?.[0];

  if (!photo) {
    return null;
  }

  const result = {
    url: photo.urls.regular,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    unsplashUrl: photo.links.html,
    downloadLocation: photo.links.download_location,
    photoId: photo.id,
  };

  setCache(normalizedQuery, result);
  return result;
}
