import { SelectTravelLists } from "@/constants/options";
import React from "react";

const Member = ({ formData, handleChange }) => {
  return (
    <>
      <div className="">
        <h2 className="text-xl  font-medium mt-6 text-blue-800">
          Who do you plan on travelling with on your next adventure?
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-4">
          {SelectTravelLists.map((item, index) => (
            <div
              key={index}
              onClick={() => handleChange("traveler", item.people)}
              className={`p-4 border rounded-lg py-4 bg-zinc-100 hover:shadow-lg cursor-pointer card-hover-effect  transition-shadow duration-400 ease-in-out  ${
                formData?.traveler == item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="text-lg font-semibold text-slate-800 mt-2">
                {item.title}
              </h2>
              <h2 className="text-sm text-gray-500 ">{item.description}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Member;
