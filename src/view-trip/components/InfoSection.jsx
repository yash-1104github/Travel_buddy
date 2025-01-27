import { getPlaces, PHOTO_REF_URL } from "@/service/GlobalAPI";
import { useEffect, useState } from "react";




const InfoSection = ({ trip }) => {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto() ;
    }, [trip])

    const GetPlacePhoto = async () => {
        //console.log(trip?.userSelection?.location?.label);
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await getPlaces(data).then(response => {

            //console.log(response.data.places[0].photos[4].name);

            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", response.data.places[0].photos[4].name);

            // console.log(PhotoUrl);

            setPhotoUrl(PhotoUrl);
        })
    }



    return (
        <>
            <div>
                <div className="flex  justify-center gap-5">

                    <img className="h-[270px] w-[500px] object-cover  rounded-xl  shadow-md shadow-zinc-600 " src={photoUrl}/>

                </div>

                <div className="flex flex-col  my-5 gap-2">
                    <h2 className="flex justify-center  font-bold ml-4 text-2xl">{trip?.userSelection?.location?.label}</h2>

                    <div className="gap-2 mt-2 flex-col sm:flex-row flex justify-center items-center">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 mt-2">🗓️ {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 mt-2">💸 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 mt-2">👫No of Traveler: {trip?.userSelection?.traveler}</h2>
                    </div>

                </div>
            </div>
        </>
    );
};

export default InfoSection;
