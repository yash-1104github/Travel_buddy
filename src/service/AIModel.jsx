import { GoogleGenerativeAI } from "@google/generative-ai";



const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
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
                    { text: "Generate Travel Plan for Location : Goa, India, for 2 Days for 1 with a Luxury budget,Give me a Hotels options list with HotelName,Hotel address,Price range in rupees if indian otherwise  in dollar per night,hotel image url, geo coordinates, rating, descriptions and suggest itinerary   with  placeName, place  detail, place image URL, Geo coordinates, ticket pricing ,Time t Travel each of the location for 2 days with each day plan with best time to visit in JSON format and schedule each day in hours time periods starting from 10pm to 7pm with each section of time should and divided to travel each places on that day" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "```json\n{\n  \"tripName\": \"Luxury Goa Getaway (2 Days)\",\n  \"location\": \"Goa, India\",\n  \"duration\": \"2 Days\",\n  \"budget\": \"Luxury\",\n  \"bestTimeToVisit\": \"October to March\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"The Leela Goa\",\n      // ... (Hotel details)\n    },\n    // ... (Other hotels)\n  ],\n  \"itinerary\": [\n    {\n      \"date\": \"Day 1\",\n      \"places\": [\n        {\n          \"placeName\": \"Hotel (Check-in & Lunch)\",\n          \"placeDetail\": \"Arrival and check-in at your hotel (e.g., The Leela). Enjoy a leisurely lunch at the hotel or a nearby beachside restaurant.\",\n          \"time\": \"10:00 AM - 2:00 PM\", // Time range for this activity\n          // ... (Other place details)\n        },\n        {\n          \"placeName\": \"Beach/Pool & Water Sports\",\n          \"placeDetail\": \"Relax by the beach or pool. Enjoy various water sports activities if you wish.\",\n          \"time\": \"2:00 PM - 5:00 PM\",\n          // ... (Other place details)\n        },\n        {\n          \"placeName\": \"Mandovi River Sunset Cruise\",\n          \"placeDetail\": \"Enjoy a scenic sunset cruise with live music and entertainment.\",\n          \"time\": \"5:00 PM - 7:00 PM\",\n          // ... (Other place details)\n        },\n        {\n          \"placeName\": \"Dinner & Nightlife\",\n          \"placeDetail\": \"Dinner at a fine-dining restaurant followed by exploring Goa's nightlife or enjoying live music.\",\n          \"time\": \"7:00 PM onwards\", // Open-ended time\n          // ... (Other place details, if any)\n        }\n\n      ]\n    },\n    {\n      \"date\": \"Day 2\",\n      \"places\": [\n        {\n          \"placeName\": \"Old Goa Churches\",\n          \"placeDetail\": \"Explore the historical churches of Old Goa, including the Basilica of Bom Jesus (UNESCO World Heritage Site).\",\n          \"time\": \"10:00 AM - 12:00 PM\",\n           // ... (Other place details)\n        },\n        {\n          \"placeName\": \"Lunch in Panjim\",\n          \"placeDetail\": \"Have lunch at a local restaurant in Panjim, the capital city of Goa.\",\n          \"time\": \"12:00 PM - 2:00 PM\",\n           // ... (Other place details)\n\n        },\n        {\n          \"placeName\": \"Panjim Market Shopping\",\n          \"placeDetail\": \"Explore Panjim's local markets for handicrafts, spices, and souvenirs.\",\n          \"time\": \"2:00 PM - 5:00 PM\",\n          // ... (Other place details)\n        },\n        {\n          \"placeName\": \"Spa & Relaxation/Dinner\",\n          \"placeDetail\": \"Enjoy a relaxing spa treatment at your hotel, followed by dinner at The Fisherman's Wharf or another restaurant of your choice.\",\n          \"time\": \"5:00 PM - 9:00 PM\",  // Combined time range if appropriate\n           // ... (Other place details)\n        },\n        {\n          \"placeName\": \"Casino/Leisure Time\",\n          \"placeDetail\": \"Spend the evening at a casino or enjoy some leisure time.\",\n          \"time\": \"9:00 PM onwards\",\n          // ... (Other place details)\n        }\n      ]\n    }\n  ]\n}\n```\n\n\nKey changes:\n\n- No separate `schedule` array.  The `time` is directly within each `place` object.\n- Combined activities where appropriate (e.g., Spa & Dinner) to avoid excessive entries if they happen in the same general time frame.\n- Adjusted the `placeDetail` to incorporate more context when combining activities.\n- Open-ended times like \"7:00 PM onwards\" are used where appropriate." },
                ],
            },

        ],
    });



// {
//     role: "user",
//         parts: [
//             { text: "Generate Travel Plan for Location : Goa, India, for 2 Days for 1 with a Luxury budget,Give me a Hotels options list with HotelName,Hotel address,Price range in rupees if indian otherwise  in dollar per night,hotel image url, geo coordinates, rating, descriptions and suggest itinerary   with  placeName, place  detail, place image URL, Geo coordinates, ticket pricing ,Time t Travel each of the location for 2 days with each day plan with best time to visit in JSON format and schedule each day in hours time periods starting from 10pm to 7pm with each section of time should and divided to travel each places on that day." },
//         ],
//             },
// {
//     role: "model",
//         parts: [
//             { text: "```json\n{\n  \"tripName\": \"Luxury Goa Getaway (2 Days)\",\n  \"location\": \"Goa, India\",\n  \"duration\": \"2 Days\",\n  \"budget\": \"Luxury\",\n  \"bestTimeToVisit\": \"October to March\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"The Leela Goa\",\n      \"hotelAddress\": \"Mobor, Cavelossim, Goa 403731, India\",\n      \"priceRange\": \"₹25,000 - ₹50,000\", \n      \"hotelImageURL\": \"https://www.theleela.com/media/images/goa/gallery/large/The_Leela_Goa_Lagoon_Deluxe_Room_1.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 15.2642,\n        \"longitude\": 73.9133\n      },\n      \"rating\": 5,\n      \"description\": \"A luxurious beachfront resort with private lagoons and sprawling gardens.\"\n    },\n    {\n      \"hotelName\": \"Taj Exotica Resort & Spa, Goa\",\n      \"hotelAddress\": \"Calwaddo, Benaulim, Goa 403716, India\",\n      \"priceRange\": \"₹20,000 - ₹40,000\",\n      \"hotelImageURL\": \"https://www.tajhotels.com/content/dam/luxury/grand-palaces/taj-exotica-resort-and-spa-goa-exgoa/images/16x7/Overview/TAJ_Exotica_Goa_Exterior_Facade_16x7.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg\",\n      \"geoCoordinates\": {\n        \"latitude\": 15.3354,\n        \"longitude\": 73.8119\n      },\n      \"rating\": 4.8,\n      \"description\": \"Mediterranean-inspired resort with a private beach, golf course, and spa.\"\n    },\n    {\n      \"hotelName\": \"W Goa\",\n      \"hotelAddress\": \"Vagator Beach, Bardez, Goa 403509, India\",\n      \"priceRange\": \"₹18,000 - ₹35,000\",\n      \"hotelImageURL\": \"https://www.marriott.com/content/dam/marriott-renditions/GOIXW/goixw-exterior-5600.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 15.5614,\n        \"longitude\": 73.7489\n      },\n      \"rating\": 4.6,\n      \"description\": \"Trendy beachfront hotel with vibrant design, a lively atmosphere, and a private beach.\"\n    }\n  ],\n\n\n\n  \"itinerary\": {\n    \"day1\": {\n      \"schedule\": [\n        {\"time\": \"10:00 AM - 12:00 PM\", \"activity\": \"Arrival & Check-in at Hotel (e.g., The Leela Goa)\"},\n        {\"time\": \"12:00 PM - 2:00 PM\", \"activity\": \"Lunch at a beachside restaurant\"},\n        {\"time\": \"2:00 PM - 5:00 PM\", \"activity\": \"Relaxing by the beach/pool and Water Sports Activities\"},\n        {\"time\": \"5:00 PM - 7:00 PM\", \"activity\": \"Sunset cruise on the Mandovi River\"},\n        {\"time\": \"7:00 PM - 9:00 PM\", \"activity\": \"Dinner at a fine-dining restaurant\"},\n        {\"time\": \"9:00 PM onwards\", \"activity\": \"Explore the nightlife or enjoy live music\"}\n      ],\n      \"places\": [\n        {\n          \"placeName\": \"Mandovi River\",\n          \"placeDetail\": \"Enjoy a scenic sunset cruise with live music and entertainment.\",\n          \"placeImageURL\": \"https://www.goatourism.gov.in/destinations/details/1/mandovi-river\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.4974,\n            \"longitude\": 73.8279\n          },\n           \"ticketPricing\": \"₹500 - ₹1500 per person\" // Approximate range\n        }\n      ]\n    },\n    \"day2\": {\n      \"schedule\": [\n        {\"time\": \"10:00 AM - 12:00 PM\", \"activity\": \"Explore Old Goa's historical churches\"},\n        {\"time\": \"12:00 PM - 2:00 PM\", \"activity\": \"Lunch at a local restaurant in Panjim\"},\n        {\"time\": \"2:00 PM - 5:00 PM\", \"activity\": \"Shopping at Panjim's local markets\"},\n        {\"time\": \"5:00 PM - 7:00 PM\", \"activity\": \"Relax and enjoy a spa treatment at the hotel\"},\n         {\"time\": \"7:00 PM - 9:00 PM\", \"activity\": \"Dinner at The Fisherman's Wharf\"},\n        {\"time\": \"9:00 PM onwards\", \"activity\": \"Casino or Leisure time \"}\n      ],\n      \"places\": [\n        {\n          \"placeName\": \"Basilica of Bom Jesus\",\n          \"placeDetail\": \"A UNESCO World Heritage Site and a significant historical church.\",\n          \"placeImageURL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Basilica_of_Bom_Jesus%2C_Old_Goa.jpg/800px-Basilica_of_Bom_Jesus%2C_Old_Goa.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.505,\n            \"longitude\": 73.9154\n          },\n           \"ticketPricing\": \"Free entry\" // Example\n        },\n        {\n          \"placeName\": \"Panjim Market\",\n          \"placeDetail\": \"A bustling market with local handicrafts, spices, and souvenirs.\",\n          \"placeImageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/88/panjim-market.jpg?w=700&h=-1&s=1\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.4971,\n            \"longitude\": 73.8262\n          },\n           \"ticketPricing\": \"Free entry\" // Example\n        }\n\n      ]\n    }\n  }\n}\n```\n\n\nThis detailed JSON provides a structured travel plan including hotel options with necessary information like addresses, pricing, ratings, and images. It also covers a two-day itinerary with scheduled activities and information about places to visit.  Remember that prices are estimates and can vary. Be sure to verify all information before your trip, including hotel availability and pricing, attraction opening times and ticket costs, and transportation options.   Enjoy your luxurious Goa trip! \n" },
//         ],
//             },