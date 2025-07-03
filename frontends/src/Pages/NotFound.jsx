import React from "react";
import { Link } from "react-router-dom";
import * as SC from "../../style";
import logo from "/logo.png";

export default function NotFound() {
  return (
    <SC.Main8 className="min-h-screen flex flex-col items-center justify-center bg-background text-white relative px-6">
      <section className="flex flex-col items-center justify-center text-center py-20 max-w-3xl ">
        <h1 className="flex text-6xl font-extrabold text-red-600 mb-4 gap-5">
          {" "}
          <img src={logo} alt="Logo" className="h-20" />
          404{" "}
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-300 text-base md:text-lg mb-8 px-2">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>
      </section>

      <footer className="py-6 text-center text-gray-500 ">
        &copy; {new Date().getFullYear()} Vic Movies Hub. All rights reserved.
      </footer>
    </SC.Main8>
  );
}