import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 text-gray-700 py-8 border-t">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-[#f56551]">Travel Buddy</h2>
                        <p className="text-sm text-gray-500">© 2025 All rights reserved.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <p  className="text-gray-600 text-xl font-bold hover:text-[#f56551]">Developed by Yash Gupta ❤️</p>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
