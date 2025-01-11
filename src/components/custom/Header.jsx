import React from "react";
import { Button } from "../ui/button";


const Header = () => {
   
  

  return (
    <>
      <div className="p-3  shadow-sm flex justify-between items-center px-5 gap-5 bg-gray-50">
       
        <img src="/logo.svg"/>

        <div className="flex gap-5">
        <a href='/'>
            <Button >Home</Button>
          </a>  
           
          <a href='/create-trip'>
            <Button>Create Trips</Button>
           </a> 
        </div>
       </div>
    </>
  );
};

export default Header;
