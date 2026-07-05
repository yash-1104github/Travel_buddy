import { searchPhoto, FALLBACK_PHOTO_URL } from "@/service/GlobalAPI";
import { UnsplashPhoto } from "@/components/UnsplashPhoto";
import { useEffect, useState } from "react";

const InfoSection = ({ trip }) => {
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex justify-center rounded-xl overflow-hidden shadow-lg">
        <UnsplashPhoto
          credit={credit}
          src={photoUrl}
          alt={locationName}
          className="h-[220px] md:h-[320px] w-full object-cover"
          creditClassName="absolute top-2 right-2 bg-black/40 px-2 py-1 rounded truncate max-w-[70%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <h2 className="absolute bottom-5 text-2xl md:text-4xl font-semibold text-slate-200 drop-shadow-lg pointer-events-none">
          {locationName}
        </h2>
      </div>

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
  );
};

export default InfoSection;
