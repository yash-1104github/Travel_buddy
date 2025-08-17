import { getPlaces, PHOTO_REF_URL } from "@/service/GlobalAPI";
import { useEffect, useState } from "react";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery:
        trip?.userSelection?.location?.placeName ||
        trip?.userSelection?.location?.label,
    };

    const result = await getPlaces(data).then((response) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[4].name ||
          response.data.places[0].photos[4].label
      );

      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        {/* Hero Image */}
        <div className="relative flex justify-center">
          <img
            className="h-[220px] md:h-[320px] w-full object-cover rounded-xl shadow-lg"
            src={photoUrl}
            alt={
              trip?.userSelection?.location?.name ||
              trip?.userSelection?.location?.label
            }
          />
          {/* Optional overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent"></div>
          <h2 className="absolute bottom-5 text-2xl md:text-4xl font-semibold text-slate-200 drop-shadow-lg">
            {trip?.userSelection?.location?.name ||
              trip?.userSelection?.location?.label}
          </h2>
        </div>

        {/* Trip Details */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-full shadow-sm">
            🗓️ {trip?.userSelection?.noOfDays} Days
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-800 font-medium rounded-full shadow-sm">
            💸 {trip?.userSelection?.budget} Budget
          </span>
          <span className="px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-full shadow-sm">
            👫 Travelers: {trip?.userSelection?.traveler}
          </span>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
