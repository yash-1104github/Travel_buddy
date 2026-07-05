import React from "react";
import HotelCard from "./HotelCard";

const Hotel = ({ trip }) => {
  return (
    <>
      <div className="mt-16 px-0 md:px-4 ">
        <h2 className="font-medium text-2xl md:text-3xl text-[#1B2332] mb-6 border-l-4 border-blue-500 pl-3 ">
            🏨 Hotels Recommendation
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-5 py-2 md:p-4  mt-5 font-semibold ">
          {trip?.tripData?.hotels?.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hotel;
