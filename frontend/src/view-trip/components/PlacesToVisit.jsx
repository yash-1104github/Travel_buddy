import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <>

      <div className="mt-16 px-0 md:px-4 ">
        {/* Section Title */}
        <h2 className="font-medium text-3xl  text-[#1B2332] mb-6 border-l-4 border-blue-500 pl-3">
          🌍 Places to Visit
        </h2>

        <div>
          {trip?.tripData?.itinerary?.map((item, index) => (
            <div key={index} className="mb-10 ">
         
              {/* Day Heading */}
              <h2 className="font-semibold text-xl text-gray-800 mb-4">
                📅 {item?.day ? item.day : "Each Day Plan"}
              </h2>

              {/* Grid of Places */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {item?.places?.map((place, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Time Label */}
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-sm font-medium px-3 py-1">
                      🕒 {place.time}
                    </div>

                    {/* Place Card */}
                    <div className="">
                      <PlaceCardItem place={place} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlacesToVisit;
