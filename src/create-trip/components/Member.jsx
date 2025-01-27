import { SelectTravelLists } from "@/constants/options";
import React from "react";

const Member = ({formData,handleChange}) => {

    return (
        <>
            <div>
                <h2 className="text-xl my-3 font-medium mt-6 text-blue-800">Who do you plan on travelling with on your next adventure?</h2>
                <div className="grid md:grid-cols-3 gap-5 mt-5 ">

                    {SelectTravelLists.map((item, index) => (
                        <div key={index}
                            onClick={() => handleChange('traveler', item.people)}
                            className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer  ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="text-lg font-bold text-slate-800">{item.title}</h2>
                            <h2 className="text-sm  text-gray-500 ">{item.description}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Member;
