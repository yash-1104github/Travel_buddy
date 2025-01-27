import { getPlaces, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({hotel}) => {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        console.log(hotel.hotelName);
        const data = {
            textQuery: hotel.hotelName
        }
        const result = await getPlaces(data).then(response => {
             console.log(response.data.places[0].photos[4].name);

            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", response.data.places[0].photos[4].name);
            console.log(PhotoUrl);
            setPhotoUrl(PhotoUrl);
        })
    }

  return(
    <>
          <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel.hotelAddress} target="_blank">
              <div  className="hover:scale-105  transition-all cursor-pointer" >
                  <img src={photoUrl ? photoUrl : 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D'} alt="logo" className="rounded-xl object-cover h-[200px] w-full" />
                  <div className="my-2 gap-2 flex flex-col hover:shadow-lg">
                      <h2 className="font-medium">{hotel.hotelName}</h2>
                      <h2 className="text-sm  text-gray-500">📍 {hotel.hotelAddress}</h2>
                      <h2 className="text-sm ">💰 {hotel.priceRange} per night</h2>
                      <h2 className="text-base text-gray-800">⭐ {hotel.rating} stars</h2>
                  </div>
              </div>
          </Link>
    </>
  );
};

export default HotelCard;
