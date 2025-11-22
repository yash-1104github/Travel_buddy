import { getPlaces, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { BsUpload } from "react-icons/bs";

const UserTripCard = ({ trip, hide, onDelete, addTrip }) => {
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

  // console.log("hide",hide);
  //console.log("trip",trip);

  return (
    <>
      <div className="w-full justify-center flex">
        <Link to={"/view-trip/" + trip?.id} className="cursor-pointer">
          <div className="py-4">
            <div className="relative inline-block">
              <img
                className="h-[280px] w-[520px] object-cover rounded-lg shadow-sm shadow-zinc-500"
                src={photoUrl}
              />

              {hide ? null : (
                <div className="">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addTrip(trip?.id, trip);
                    }}
                    className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 hover:bg-gray-400 px-2 py-2 rounded-full text-xs shadow-md transition"
                  >
                    <BsUpload size={14} />
                    <span>Add to Community</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(trip?.id);
                    }}
                    className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 hover:bg-gray-400 px-2 py-2 rounded-full text-xs shadow-md transition"
                  >
                    <Trash2 size={14} />
                    <span>Remove Trip</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center -ml-8 flex-col  p-1 text-center">
              <h2 className="font-bold text-lg mt-2 text-green-500">
                {trip?.userSelection?.location?.label}
              </h2>
              <h2 className="text-blue-500 text-base">
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
      </div>
    </>
  );
};

export default UserTripCard;
