import { getPlaces, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    console.log(hotel.hotelName);
    const data = {
      textQuery: hotel.hotelName,
    };
    const result = await getPlaces(data).then((response) => {
      console.log(response.data.places[0].photos[4].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[4].name
      );
      console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          hotel.hotelName +
          "," +
          hotel.hotelAddress
        }
        target="_blank"
      >
        <div className="rounded-2xl bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden cursor-pointer">
          <div className="relative">
            <img
              src={
                photoUrl
                  ? photoUrl
                  : "https://images.unsplash.com/photo-1502920514313-52581002a659?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              }
              alt={hotel.hotelName}
              className="h-[250px] w-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow">
              ⭐ {hotel.rating}
            </div>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-blue-500 truncate text-center">
              {hotel.hotelName}
            </h2>
            <p className="text-sm text-gray-600 flex items-center justify-left gap-1 mt-3">
              📍 {hotel.hotelAddress}
            </p>
            <div className="flex items-center justify-between ">
              <span className="text-base font-medium text-gray-800">
                💰 {hotel.priceRange} / night
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HotelCard;
