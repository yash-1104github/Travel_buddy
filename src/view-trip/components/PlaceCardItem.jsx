
import { getPlaces, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PlaceCardItem = ({ place }) => {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {

        //console.log( place.placeName);

        const data = {
            textQuery: place.placeName
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
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target="_blank">
                <div className="border p-2 rounded-lg mt-3  flex hover:scale-105 transition-all duration-300 cursor-pointer">
                    <img src={photoUrl ? photoUrl : 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D'}
                        className="w-[130px] h-[150px]  rounded-lg object-cover" alt="logo" />
                    <div className=" ml-3  border-rounded ">
                        <h2 className="font-bold text-base text-slate-900">{place.placeName}</h2>
                        <p className="text-base text-gray-700">{place.placeDetail}</p>
                        <h2 className="mt-2 text-base font-medium">💵 {place.ticketPricing ? place.ticketPricing : 'N/A'}</h2>

                    </div>

                </div>
            </Link>
        </>
    )
};

export default PlaceCardItem;
