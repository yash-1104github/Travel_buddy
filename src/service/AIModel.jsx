import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_MODEL_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : Goa, India, for 2 Days for 1 with a Luxury budget,Give me a Hotels options list with HotelName,Hotel address,Price range in rupees if indian otherwise  in dollar per night,hotel image url, geo coordinates, rating, descriptions and suggest itinerary   with  placeName, place  detail, place image URL, Geo coordinates, ticket pricing ,Time t Travel each of the location for 2 days with each day plan with best time to visit in JSON format and schedule each day in hours time periods starting from 10pm to 7pm with each section of time should and divided to travel each places on that day and Avoid mixing terms like `schedule` and `places` within the same itinerary and ensure only return response in JSOS format and do not include commands in between of response",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripName": "Luxury Goa Getaway (2 Days)",\n  "location": "Goa, India",\n  "duration": "2 Days",\n  "budget": "Luxury",\n  "bestTimeToVisit": "October to March",\n  "hotels": [\n    {\n      "hotelName": "The Leela Goa",\n      // ... (Hotel details)\n    },\n    // ... (Other hotels)\n  ],\n  "itinerary": [\n    {\n      "date": "Day 1",\n      "places": [\n        {\n          "placeName": "Hotel (Check-in & Lunch)",\n          "placeDetail": "Arrival and check-in at your hotel (e.g., The Leela). Enjoy a leisurely lunch at the hotel or a nearby beachside restaurant.",\n          "time": "10:00 AM - 2:00 PM", // Time range for this activity\n          // ... (Other place details)\n        },\n        {\n          "placeName": "Beach/Pool & Water Sports",\n          "placeDetail": "Relax by the beach or pool. Enjoy various water sports activities if you wish.",\n          "time": "2:00 PM - 5:00 PM",\n          // ... (Other place details)\n        },\n        {\n          "placeName": "Mandovi River Sunset Cruise",\n          "placeDetail": "Enjoy a scenic sunset cruise with live music and entertainment.",\n          "time": "5:00 PM - 7:00 PM",\n          // ... (Other place details)\n        },\n        {\n          "placeName": "Dinner & Nightlife",\n          "placeDetail": "Dinner at a fine-dining restaurant followed by exploring Goa\'s nightlife or enjoying live music.",\n          "time": "7:00 PM onwards", // Open-ended time\n          // ... (Other place details, if any)\n        }\n\n      ]\n    },\n    {\n      "date": "Day 2",\n      "places": [\n        {\n          "placeName": "Old Goa Churches",\n          "placeDetail": "Explore the historical churches of Old Goa, including the Basilica of Bom Jesus (UNESCO World Heritage Site).",\n          "time": "10:00 AM - 12:00 PM",\n           // ... (Other place details)\n        },\n        {\n          "placeName": "Lunch in Panjim",\n          "placeDetail": "Have lunch at a local restaurant in Panjim, the capital city of Goa.",\n          "time": "12:00 PM - 2:00 PM",\n           // ... (Other place details)\n\n        },\n        {\n          "placeName": "Panjim Market Shopping",\n          "placeDetail": "Explore Panjim\'s local markets for handicrafts, spices, and souvenirs.",\n          "time": "2:00 PM - 5:00 PM",\n          // ... (Other place details)\n        },\n        {\n          "placeName": "Spa & Relaxation/Dinner",\n          "placeDetail": "Enjoy a relaxing spa treatment at your hotel, followed by dinner at The Fisherman\'s Wharf or another restaurant of your choice.",\n          "time": "5:00 PM - 9:00 PM",  // Combined time range if appropriate\n           // ... (Other place details)\n        },\n        {\n          "placeName": "Casino/Leisure Time",\n          "placeDetail": "Spend the evening at a casino or enjoy some leisure time.",\n          "time": "9:00 PM onwards",\n          // ... (Other place details)\n        }\n      ]\n    }\n  ]\n}\n```\n\n\nKey changes:\n\n- No separate `schedule` array.  The `time` is directly within each `place` object.\n- Combined activities where appropriate (e.g., Spa & Dinner) to avoid excessive entries if they happen in the same general time frame.\n- Adjusted the `placeDetail` to incorporate more context when combining activities.\n- Open-ended times like "7:00 PM onwards" are used where appropriate.',
        },
      ],
    },
  ],
});
