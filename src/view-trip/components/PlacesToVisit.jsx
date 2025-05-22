
import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <>
      <div className="mt-16 ">
        <h2 className="font-bold text-2xl text-blue-800 ">Places to Visit</h2>

        <div className="">
          {trip?.tripData?.itinerary?.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold text-lg mt-3 ml-4 text-gray-700"> {item?.day ? item.day :'Each Day Plan'}</h2>
              <div className="my-5 grid  md:grid-cols-2 gap-5 ">
                {item?.places?.map((place, index) => {
                  return (
                    <div className="my-3">
                      <h2 className="font-bold text-base ml-4 text-orange-600">{place.time}</h2>
                      <PlaceCardItem place={place} key={index} />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlacesToVisit;
