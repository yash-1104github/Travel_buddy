
import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl">Places to Visit</h2>

        <div className="">
          {trip?.tripData?.itinerary?.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold text-lg mt-3">{item.date}</h2>
              <div className="my-5 grid  md:grid-cols-2 gap-5 ">
                {item?.schedule?.map((place, index) => {
                  return (
                    <div className="my-3">
                      <h2 className="font-bold text-base text-orange-600">{place.time}</h2>
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
