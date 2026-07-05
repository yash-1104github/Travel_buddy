import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "./components/InfoSection";
import { getTrip } from "@/service/tripAPI";
import { toast } from "sonner";
import Hotel from "./components/Hotel";
import PlacesToVisit from "./components/PlacesToVisit";



const Viewtrip = () => {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    const GetTripData = async () => {
        try {
            const response = await getTrip(tripId);
            setTrip(response.data);
        } catch {
            toast("No such document!");
        }
    }

    return (
        <>
            <div className="p-10 my-2 bg-gray-50 px-4 md:px-30 lg-px-44 xl:px-60">
                <div className="h-[5rem]"></div>
                <InfoSection trip={trip} />
                <Hotel trip={trip} />
                <PlacesToVisit trip={trip} />
            </div>

        </>
    );
};

export default Viewtrip;
