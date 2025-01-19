
import React from "react";
import HotelCard from "./HotelCard";



const Hotel = ({ trip }) => {


    return (
        <>
            <div>
                <div className="font-bold text-2xl mt-5 text-center text-blue-800">
                    Hotel Recommendation
                </div>
                <div className="flex flex-cols-2 md:flex-cols-3 xl:flex-cols-4 gap-5 p-4  mt-5 font-semibold ">

                    {trip?.tripData?.hotels?.map((hotel, index) => (
                        <HotelCard key={index} hotel={hotel} />
                    ))}
                </div>
            </div>
          
              
            
        </>
    );
};

export default Hotel;
