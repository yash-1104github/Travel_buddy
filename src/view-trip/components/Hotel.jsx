
import React from "react";
import HotelCard from "./HotelCard";



const Hotel = ({ trip }) => {


    return (
        <>
            <div>
                <div className="font-bold text-2xl mt-5 text-center text-blue-800">
                    Hotel Recommendation
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 p-4  mt-5 font-semibold ">

                    {trip?.tripData?.hotels?.map((hotel, index) => (
                        <HotelCard key={index} hotel={hotel} />
                    ))}
                </div>
            </div>
          
              
            
        </>
    );
};

export default Hotel;
