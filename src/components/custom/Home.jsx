import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
        <div className="flex flex-col items-center mx-56 ">
            <h1
              className="font-extrabold text-[50px] text-center text-gray-800 mt-10"
              ><span className="text-[#f56551]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
            <p className="text-xl text-gray-500 text-center mt-5">Your personal trip and travel curator, creating custom Itineraries tailored to your interests and budget.</p>
        
        <Link to={'/create-trip'}>

        <Button className="mt-4">Get Started, It's Free</Button>
        
        </Link>
        
        </div>
    </>
  );
};

export default Home;
