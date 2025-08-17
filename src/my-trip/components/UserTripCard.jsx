import { getPlaces, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await getPlaces(data).then((response) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[4].name
      );

      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <>
      <Link
        to={"/view-trip/" + trip?.id}
        className="hover:scale-105  transition-all cursor-pointer"
      >
        <div className="py-4">
          <img
            className="h-[280px] w-[520px] object-cover rounded-lg  shadow-md shadow-zinc-600 "
            src={photoUrl}
          />

          <div className="flex justify-center items-center -ml-8 flex-col  p-1 text-center">
            <h2 className="font-bold text-lg mt-2 text-gray-800 ">
              {trip?.userSelection?.location?.label}
            </h2>
            <h2 className="text-gray-500 text-sm">
              {" "}
              <span className="font-bold">
                {" "}
                {trip?.userSelection.noOfDays} Days{" "}
              </span>
              trip with{" "}
              <span className="font-bold">{trip?.userSelection?.budget}</span>{" "}
              Budget
            </h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserTripCard;
