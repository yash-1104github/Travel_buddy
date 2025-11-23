import { getPlaces, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await getPlaces(data).then((response) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[5].name
      );
      
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" + place.placeName
        }
        target="_blank"
      >
        <div className="group cursor-pointer ">
          <img
            src={
              photoUrl
                ? photoUrl
                : "https://images.unsplash.com/photo-1502920514313-52581002a659?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
            }
            className="w-full h-[260px] object-cover"
            alt={place.placeName}
          />

          <div className="p-4">
            <h2 className="font-medium text-lg text-blue-500">
              {place.placeName}
            </h2>
            <p className="text-base text-gray-600 mt-1 line-clamp-2">
              {place.placeDetail}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-base font-medium text-gray-800">
                💵 {place.ticketPricing ? place.ticketPricing : "N/A"}
              </span>
              <span className="text-blue-600 text-sm font-medium group-hover:no-underline">
                View on Map →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PlaceCardItem;
