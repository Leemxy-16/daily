import { useState, useEffect } from "react";
import logo from "/logo.png";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../Components/ButtomNav.tsx/buttonNav";
import * as SC from "../../style";
import { genreMap } from "../assets/genres/genresMap";
import React from "react";

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  runtime?: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
};

export default function Library() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<
    "watchlist" | "favourite" | "settings"
  >("watchlist");

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    const storedFav = localStorage.getItem("favorites");

    setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
    setFavorites(storedFav ? JSON.parse(storedFav) : []);
  }, []);

  const handleRemoveFromList = (
    movieId: number,
    listType: "watchlist" | "favorites"
  ) => {
    const updatedList = (
      listType === "watchlist" ? watchlist : favorites
    ).filter((movie) => movie.id !== movieId);

    if (listType === "watchlist") {
      setWatchlist(updatedList);
      localStorage.setItem("watchlist", JSON.stringify(updatedList));
    } else {
      setFavorites(updatedList);
      localStorage.setItem("favorites", JSON.stringify(updatedList));
    }
  };

  const renderMovies = (
    movies: Movie[],
    title: string,
    listType: "watchlist" | "favorites"
  ) => (
    <>
      <h2 className="text-[16px] font-semibold mb-3 text-left px-4">{title}</h2>
      {movies.length === 0 ? (
        <p className="text-gray-400">No movies in {title.toLowerCase()} yet.</p>
      ) : (
        <div className="grid grid-cols-1 px-2 gap-4 w-full ">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative rounded-md w-full h-[20vh] flex justify-between bg-input py-1 pr-1 overflow-hidden"
            >
              <Link
                to={`/movie/${movie.id}`}
                className="flex flex-col text-left p-2 w-[60%] relative"
              >
                <p className="text-gray-400">
                  {movie.genre_ids
                    ?.map((id) => genreMap[id])
                    .filter(Boolean)
                    .join(", ") || "Unknown Genre"}
                </p>
                <h2 className=" font-bold">{movie.title}</h2>
                <div className="text-xs text-gray-400 mt-1">
                  <p>
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "Unknown Year"}{" "}
                    •{" "}
                    {movie.runtime
                      ? `${movie.runtime} mins`
                      : "Duration Unknown"}
                  </p>
                </div>
              </Link>

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
                className="rounded-md object-cover h-full"
              />

              <button
                onClick={() => handleRemoveFromList(movie.id, listType)}
                className="absolute bottom-2 left-2 bg-red-700 text-white px-2 py-1 text-xs rounded hover:bg-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <SC.Main5 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
        <span className=" flex justify-between items-center mb-5 px-3">
          <Link to="/Home">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-[16px] font-semibold">My Library</h2>
          <Link to="/home">
            <img src={logo} alt="" className="h-10" />
          </Link>
        </span>

        {/* Toggle Buttons */}
        <span className="flex left-0 mb-6 gap-2 px-3 ">
          {["watchlist", "favourite", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-1 rounded-xl text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-red-700 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </span>

        {/* Content Sections */}
        {activeTab === "watchlist" &&
          renderMovies(watchlist, "Your Watchlist", "watchlist")}
        {activeTab === "favourite" &&
          renderMovies(favorites, "Your Favorites", "favorites")}
        {activeTab === "settings" && (
          <p className="text-gray-400">Settings Coming Soon...</p>
        )}
        <div className="fixed bottom-0 w-full max-w-md bg-input text-white py-3 flex justify-between items-center shadow-inner z-50">
          <BottomNav />
        </div>
      </div>
    </SC.Main5>
  );
}