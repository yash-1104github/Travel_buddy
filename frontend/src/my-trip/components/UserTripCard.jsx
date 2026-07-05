import { searchPhoto, FALLBACK_PHOTO_URL } from "@/service/GlobalAPI";
import { UnsplashPhoto } from "@/components/UnsplashPhoto";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { BsUpload } from "react-icons/bs";

const UserTripCard = ({ trip, hide, onDelete, addTrip }) => {
  const [photoUrl, setPhotoUrl] = useState(FALLBACK_PHOTO_URL);
  const [credit, setCredit] = useState(null);

  const locationName =
    trip?.userSelection?.location?.name ||
    trip?.userSelection?.location?.label;

  useEffect(() => {
    if (!locationName) return;

    const loadPhoto = async () => {
      try {
        const photo = await searchPhoto(`${locationName} travel destination`);
        setPhotoUrl(photo.url);
        setCredit(photo);
      } catch {
        setPhotoUrl(FALLBACK_PHOTO_URL);
        setCredit(null);
      }
    };

    loadPhoto();
  }, [locationName]);

  return (
    <div className="w-full justify-center flex">
      <Link to={"/view-trip/" + trip?.id} className="cursor-pointer">
        <div className="py-4">
          <div className="relative inline-block rounded-lg overflow-hidden">
            <UnsplashPhoto
              credit={credit}
              src={photoUrl}
              alt={locationName}
              className="h-[280px] w-[520px] object-cover"
            />

            {hide ? null : (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addTrip(trip?.id, trip);
                  }}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-white/90 hover:bg-gray-400 px-2 py-2 rounded-full text-xs shadow-md transition"
                >
                  <BsUpload size={14} />
                  <span>Add to Community</span>
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center items-center -ml-8 flex-col p-1 text-center">
            <h2 className="font-bold text-lg mt-2 text-green-500">{locationName}</h2>
            <h2 className="text-blue-500 text-base">
              <span className="font-bold">{trip?.userSelection.noOfDays} Days</span>{" "}
              trip with{" "}
              <span className="font-bold">{trip?.userSelection?.budget}</span> Budget
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserTripCard;
