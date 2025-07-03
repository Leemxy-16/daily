import React from "react";
import { Link } from "react-router-dom";
import * as SC from "../../style";
import logo from '/logo.png'

export default function LandingPage() {
  return (
    
    <SC.Main7 className="min-h-screen flex flex-col items-center justify-center bg-background text-white">
      <img src={logo} alt="" className="h-20 absolute top-5 left-5"/>
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 ">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Your Next Favorite Movie</h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8">
          Explore top-rated movies, build your watchlist, and save your favourites — all in one place.
        </p>
        <Link
          to="/log_in"
          className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Start Exploring
        </Link></section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-[#111]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-red-900/20 p-6 rounded-xl border border-red-700 shadow">
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-gray-400">Get personalized movie suggestions based on your taste.</p>
          </div>
          <div className="bg-red-900/20 p-6 rounded-xl border border-red-700 shadow">
            <h3 className="text-xl font-semibold mb-2">Watchlist</h3>
            <p className="text-gray-400">Save movies to watch later and keep track of what you love.</p>
          </div>
          <div className="bg-red-900/20 p-6 rounded-xl border border-red-700 shadow">
            <h3 className="text-xl font-semibold mb-2">Explore Trailers</h3>
            <p className="text-gray-400">Watch official trailers before committing to a film night.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 mt-auto">
        &copy; {new Date().getFullYear()} Vic Movies Hub. All rights reserved.
      </footer>
    </SC.Main7>
  );
}