
import React from "react";
import HotelCard from "./HotelCard";



const Hotel = ({ trip }) => {


    return (
        <>
            <div className="font-bold text-2xl mt-5">
                Hotel Recommendation

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">

                    {trip?.tripData?.hotels?.map((hotel, index) => (
                        <HotelCard key={index} hotel={hotel} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Hotel;
