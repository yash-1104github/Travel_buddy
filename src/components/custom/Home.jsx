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
import companies from "../../constants/companies.json";
import faqs from "@/constants/faq.json";
import { testimonialsData, feature } from "@/constants/data";
import { Card, CardContent, CardHeader, } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";

const Home = () => {

  return (
    <>
      <div className="flex flex-col items-center  mx-12 sm:mx-32  lg:mx-40 md:mx-56  ">
        <h1
          className="font-extrabold text-[30px] sm:text-[40px]    md:text-[50px]  lg:text-[60px] text-center text-gray-800 mt-8">
          <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
        <p className="text-lg  sm:text-xl text-gray-500 text-center mt-5" >Your personal trip and travel curator, creating custom Itineraries tailored to your interests and budget.</p>

        <Link to={'/create-trip'}>
          <Button className="m-10 h-14 w-44 rounded-lg animate-bounce" > <span className="text-base">Get Started, It's Free </span></Button>
        </Link>


        <div className="py-16">
          <img src="/demo.png" width={1000}
            height={400}
            alt="Preview"
            className="rounded-lg shadow-2xl mt-2 border mx-auto"
          />
        </div>

        <Accordion type="multiple" className="w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-base ">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-500 text-base">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-16">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <Card key={index} className="p-6 card-hover-effect hover:shadow-lg transition-shadow duration-400 ease-in-out">
                  <CardContent className="pt-2">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-center">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <h2 className="text-3xl font-bold text-gray-700 text-center my-8">Our Partners</h2>  
        
        <Carousel plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
          className="w-full py-10">
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>


        <section className="py-8">
          <div className="container mx-auto px-2">
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-16">
              What we offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {feature.map((feature, index) => (
                <Card key={index} className="card-hover-effect hover:shadow-lg transition-shadow duration-400 ease-in-out">
                  <CardContent className="py-4">
                    <CardHeader>
                      <h1 className="text-lg mx-auto font-semibold text-center text-[#f56551]">{feature.head}</h1>
                    </CardHeader>
                    <p className="text-gray-600 text-center mb-7">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="h-[5rem]"></div>

        

      </div>
    </>
  );
};

export default Home;