import React from "react";
import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";


const Header = () => {
   
  

  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center px-5 gap-5 ">
      
        <img src="/logo.svg"/>

        <div className="flex gap-4">
          {/* <a href='/create-trip'>
            <Button className="rounded-3xl"><IoMdAdd /> Create Trips</Button>
          </a>  */}
        <a href='/'>
            <Button className="rounded">Home</Button>
          </a>  
           
        </div>
       </div>
    </>
  );
};

export default Header;
