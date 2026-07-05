import OpenAI from "openai";

const MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT = `You are a travel planning assistant. Generate detailed trip plans as valid JSON only.
Do not wrap the response in markdown code fences or add any text outside the JSON object.
Each itinerary day must use a "places" array (not "schedule"). Each place must include a "time" field.
Include hotels with hotelName, address, price range, geo coordinates, rating, and description.`;

const FEW_SHOT = [
  {
    role: "user",
    content:
      "Generate Travel Plan for Location : Goa, India, for 2 Days for 1 with a Luxury budget. Return hotels and a day-by-day itinerary in JSON.",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      tripName: "Luxury Goa Getaway (2 Days)",
      location: "Goa, India",
      duration: "2 Days",
      budget: "Luxury",
      bestTimeToVisit: "October to March",
      hotels: [
        {
          hotelName: "The Leela Goa",
          address: "Mobor, Cavelossim, Goa",
          price: "₹25,000 per night",
          geoCoordinates: { lat: 15.1579, lng: 73.9458 },
          rating: 4.8,
          description: "Beachfront luxury resort with spa and fine dining.",
        },
      ],
      itinerary: [
        {
          date: "Day 1",
          places: [
            {
              placeName: "Hotel Check-in & Lunch",
              placeDetail: "Arrive and check in, then enjoy lunch at the resort.",
              time: "10:00 AM - 2:00 PM",
              geoCoordinates: { lat: 15.1579, lng: 73.9458 },
              ticketPricing: "Included with stay",
            },
          ],
        },
      ],
    }),
  },
];

let client;

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return client;
}

export async function generateTripPlan(prompt) {
  const openai = getClient();

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...FEW_SHOT,
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    temperature: 1,
    max_tokens: 8192,
  });

  const text = response.choices[0]?.message?.content;

  if (!text) {
    throw new Error("Empty response from OpenAI");
  }

  return text;
}
