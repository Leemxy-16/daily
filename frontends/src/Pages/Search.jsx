import React, { useState } from "react";
import { CustomInput } from "../Components/input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../Components/ButtomNav.tsx/buttonNav";
import * as SC from "../../style";
import logo from "/logo.png";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SearchFunction() {
  const [movieName, setMovieName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!movieName.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          movieName
        )}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SC.Main3 className="min-h-screen flex items-center justify-center bg-background">
      <div
        className="bg-[url('/background/background7.jpg')] bg-cover bg-center bg-opacity-50 text-light-text py-8 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top"
      >
        {/* Header */}
        <span className="flex justify-between items-center mb-5 px-3 ">
          <Link to="/Home">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-[16px] font-bold">Movie Search</h2>
          <Link to="/home">
            <img src={logo} alt="" className="h-10" />
          </Link>
        </span>

        {/* Search Input */}
        <form className="space-y-4 px-3" onSubmit={handleSearch}>
          <CustomInput
            name="name"
            placeholder="Input Movie Name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            className=""
            rightIcon={
              <button type="submit">
                <Search className="text-gray-400" size={20} />
              </button>
            }
          />
        </form>

        {/* Results */}
        <div className="mt-6 text-left mb-12">
          {isLoading && <p className="text-center mt-4">Searching...</p>}

          {!isLoading && searchResults.length === 0 && movieName && (
            <p className="text-center mt-4 text-sm text-gray-400">
              No results found.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            {searchResults.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="bg-[rgba(153,27,27,0.7)] rounded-md overflow-hidden"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-auto"
                />
                <p className="p-2 text-sm">{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 w-full max-w-md bg-input text-white py-3 flex justify-between items-center shadow-inner z-50">
          <BottomNav />
        </div>
      </div>
    </SC.Main3>
  );
}