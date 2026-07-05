import { searchPhoto, FALLBACK_PHOTO_URL } from "@/service/GlobalAPI";
import { UnsplashPhoto } from "@/components/UnsplashPhoto";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuIndianRupee } from "react-icons/lu";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState(FALLBACK_PHOTO_URL);
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    if (!hotel?.hotelName) return;

    const loadPhoto = async () => {
      try {
        const query = [hotel.hotelName, hotel.hotelAddress, "hotel"].filter(Boolean).join(" ");
        const photo = await searchPhoto(query);
        setPhotoUrl(photo.url);
        setCredit(photo);
      } catch {
        setPhotoUrl(FALLBACK_PHOTO_URL);
        setCredit(null);
      }
    };

    loadPhoto();
  }, [hotel]);

  return (
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
          <UnsplashPhoto
            credit={credit}
            src={photoUrl}
            alt={hotel.hotelName}
            className="h-[250px] w-full object-cover"
            onClickStopPropagation
          />
          <div className="absolute top-2 right-2 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow">
            ⭐ {hotel.rating}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-blue-500 truncate text-start">
            {hotel.hotelName}
          </h2>
          <p className="text-sm text-gray-600 flex items-center justify-left gap-1 my-1">
            📍 {hotel.hotelAddress}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex text-base justify-center items-start font-medium text-gray-800">
                <span className="mt-1"><LuIndianRupee /></span>
                {hotel.priceRange
                  ? hotel.priceRange
                  : Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000}{" "}
                / Day
              </div>
            </div>

            <span className="text-blue-600 text-sm font-medium group-hover:no-underline">
              View on Map →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
