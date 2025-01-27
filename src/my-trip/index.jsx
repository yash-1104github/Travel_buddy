import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/firebaseCongfig';
import UserTripCard from './components/UserTripCard';


const Mytrips = () => {

    const navigation = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, [])


    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigation('/');
            return;
        }

        const q = query(collection(db, 'tripinfo'), where('userEmail', '==', user?.email));
        //console.log(q);
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
       // console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal, doc.data()]);
        });
    }

    return (
        <div className='flex flex-col  bg-gray-50 max-h-screen px-5 sm:px-20 md:px-32 lg:px-56 xl:px-72 '>
         <h2 className='font-bold text-4xl mt-8 text-red-500'>My trips</h2>
            <p className='text-gray-500'>Here are the trips you have created</p>
         <div className='grid grid-cols-2  mt-8 md:grid-cols-3  gap-5'>
            {
               userTrips?.length> 0?userTrips.map((trip, index) => (
                    <UserTripCard trip={trip}  />
                ))
                :<h2 className='text-red-500'>No trips found</h2>
            }
         </div>
        </div>
    )
}

export default Mytrips;
