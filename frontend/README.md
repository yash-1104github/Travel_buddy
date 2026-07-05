# Travel Buddy

AI-powered travel planner that generates personalized itineraries based on destination, budget, duration, and group size.

## Tech stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** Google OAuth
- **AI:** OpenAI (gpt-4o-mini)
- **Photos:** Unsplash API
- **Geocoding:** Geoapify

## Run locally

```bash
# Backend
cd backend
cp .env.example .env   # set MONGO_DB_URL, OPENAI_API_KEY, UNSPLASH_ACCESS_KEY
npm install
npm run dev

# Frontend (separate terminal)
cd frontend
cp .env.example .env   # set VITE_API_URL, VITE_GEOAPIFY_KEY, VITE_GOOGLE_AUTH_CLIENT_ID
npm install
npm run dev
```

## License

MIT
