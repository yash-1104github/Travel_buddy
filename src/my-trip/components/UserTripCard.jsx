import { getPlaces, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTripCard = ({trip}) => {

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
          <Link to={'/view-trip/' + trip?.id} className='hover:scale-105  transition-all cursor-pointer'>

    <div>
          <img className="h-[200px] w-[570px] object-cover  rounded-xl  shadow-md shadow-zinc-600 " src={photoUrl}  />
           <div className='flex justify-center flex-col gap-1 p-1'>
                <h2 className='font-bold text-lg mt-2  '>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-gray-500 text-sm'>{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
           </div>
         
    </div>
        </Link>
    </>
  )
}

export default UserTripCard
