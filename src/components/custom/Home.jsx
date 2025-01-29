import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
//import img from '../../img.jpg'
import faqs  from "@/constants/faq.json";

const Home = () => {



  return (

    <>

      <div className="flex flex-col items-center  mx-12 sm:mx-32  lg:mx-40 md:mx-56  ">
         
        <h1
          className="font-extrabold text-[30px] sm:text-[40px]    md:text-[50px]  lg:text-[60px] text-center text-gray-800 mt-8"
        ><span className="text-[#f56551]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
        
        <p className="text-lg  sm:text-xl text-gray-500 text-center mt-5" >Your personal trip and travel curator, creating custom Itineraries tailored to your interests and budget.</p>
      
        <Link to={'/create-trip'}>
          <Button className="m-10 h-14 w-44 rounded-lg" > <span className="text-base">Get Started, It's Free </span></Button>
        </Link>
         
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-base ">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-500 text-base">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </>
  );
};

export default Home;
