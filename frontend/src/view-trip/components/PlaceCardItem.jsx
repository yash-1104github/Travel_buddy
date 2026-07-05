import { searchPhoto, FALLBACK_PHOTO_URL } from "@/service/GlobalAPI";
import { UnsplashPhoto } from "@/components/UnsplashPhoto";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(FALLBACK_PHOTO_URL);
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    if (!place?.placeName) return;

    const loadPhoto = async () => {
      try {
        const photo = await searchPhoto(`${place.placeName} travel destination`);
        setPhotoUrl(photo.url);
        setCredit(photo);
      } catch {
        setPhotoUrl(FALLBACK_PHOTO_URL);
        setCredit(null);
      }
    };

    loadPhoto();
  }, [place]);

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="group cursor-pointer">
        <UnsplashPhoto
          credit={credit}
          src={photoUrl}
          alt={place.placeName}
          className="w-full h-[260px] object-cover"
          onClickStopPropagation
        />

        <div className="p-4">
          <h2 className="font-medium text-lg text-blue-500">{place.placeName}</h2>
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
  );
};

export default PlaceCardItem;
