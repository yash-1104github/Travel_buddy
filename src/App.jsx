import React from "react";
import Home from "./components/custom/Home";
import Header from "./components/custom/Header";
import Footer from "./components/custom/Footer";



const App = () => {
  return (
    <>
      <div className="bg-gray-50 h-[100%]">
        <Header />
        <div className="h-[5rem]"></div>
        <Home />
        <Footer />
      </div>
    </>
  );
};

export default App;
