import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import companies from "../../constants/companies.json";
import faqs from "@/constants/faq.json";
import { testimonialsData, feature } from "@/constants/data";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center  mx-4  md:mx-32 lg:mx-52">
        <div>
          <h1 className="font-extrabold text-3xl  md:text-5xl  lg:text-6xl text-center text-gray-800 mt-10">
            <span className="text-[#f56551]">
              Discover Your Next Adventure with AI:
            </span>{" "}
            Personalized Itineraries at Your Fingertips
          </h1>

          <p className="text-lg  sm:text-xl text-gray-500 text-center mt-5">
            Your personal trip and travel curator, creating custom Itineraries
            tailored to your interests and budget.
          </p>
        </div>

        <Link to={"/create-trip"}>
          <Button className="m-10 h-14 w-44 rounded-lg animate-bounce">
            {" "}
            <span className="text-base">Get Started, It's Free </span>
          </Button>
        </Link>

        <div className="py-8 hidden md:flex">
          <img
            src="/demo2.jpg"
            width={1200}
            height={600}
            alt="Preview"
            className="rounded-lg shadow-xl mt-2 border mx-auto  "
          />
        </div>

        <div>
          <div className="text-3xl  md:text-4xl  lg:text-5xl font-semibold text-gray-700 text-center my-8">
            Our Partners
          </div>

          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full py-8"
          >
            <CarouselContent className="flex gap-5 sm:gap-20 items-center">
              {companies.map(({ name, id, path }) => (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                  <img
                    src={path}
                    alt={name}
                    className="h-12 sm:h-24 object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <section className="py-8">
          <div className="container mx-auto px-4 pt-16">
            <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700 text-center mb-16">
              What Our Users Say
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-4 card-hover-effect hover:shadow-lg transition-shadow duration-400 ease-in-out"
                >
                  <CardContent className="pt-2">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full object-fit"
                      />
                      <div className="ml-3">
                        <div className="font-semibold text-lg text-[#f56551]">
                          {testimonial.name}
                        </div>
                        <div className="text-base text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-600 text-justify">
                      {testimonial.quote}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700 text-center mb-16">
              What we offer
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {feature.map((feature, index) => (
                <Card
                  key={index}
                  className="card-hover-effect hover:shadow-lg transition-shadow duration-400 ease-in-out"
                >
                  <CardContent className="py-4">
                    <CardHeader>
                      <h1 className="text-lg mx-auto font-semibold text-center text-[#f56551]">
                        {feature.head}
                      </h1>
                    </CardHeader>
                    <p className="text-gray-600 text-justify mb-4">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full max-w-9xl  mx-auto container my-16  px-2">
          <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700 text-center mb-16">
              Frequently Asked Questions
            </div>
         
          <Accordion
            type="multiple"
            className="w-full px-2 "
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className= "py-2">
                <AccordionTrigger className="text-base font-medium text-gray-800 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="h-[5rem]"></div>
      </div>
    </>
  );
};

export default Home;
