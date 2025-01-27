import { SelectBudgetOptions } from "@/constants/options";
import React from "react";

const Budget = ({formData,handleChange}) => {
   
  

  return (
    <>
                          <div>
        <h2 className="text-xl my-3 font-medium mt-5 text-blue-800">What is Your Budget?</h2>
                            <div className="grid md:grid-cols-3 gap-5 mt-5 ">
        
                                {SelectBudgetOptions.map((item, index) => (
                                    <div key={index}
                                        onClick={() => handleChange('budget', item.title)}
                                        className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                                        <h2 className="text-4xl">{item.icon}</h2>
                                        <h2 className="text-lg font-bold text-slate-800">{item.title}</h2>
                                        <h2 className="text-sm text-gray-500">{item.description}</h2>
                                    </div>
                                ))}
                            </div>
                        </div>
    </>
  );
};

export default Budget;
