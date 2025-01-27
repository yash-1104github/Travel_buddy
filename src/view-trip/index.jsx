import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "./components/InfoSection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseCongfig";
import { toast } from "sonner";
import Hotel from "./components/Hotel";
import PlacesToVisit from "./components/PlacesToVisit";



const Viewtrip = () => {

    const {tripId}= useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId&&GetTripData();
    }, [tripId])

    const GetTripData= async()=>{
        
    const docsRef = doc(db, "tripinfo", tripId);
    const docSnap = await getDoc(docsRef); 
       
    if(docSnap.exists()){
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
    }
    else{
        console.log("No such document!");
        toast("No such document!");
    }     
    }

  return (
    <>
          <div className="p-10 bg-gray-50 md:px-30 lg-px-44 xl:px-60">
              <InfoSection trip={trip} />
              <Hotel trip={trip} />
              <PlacesToVisit trip={trip} />
        </div>
    </>
  );
};

export default Viewtrip;
