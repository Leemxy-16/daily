import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";
import * as SC from "../../style";
import BottomNav from "../Components/ButtomNav.tsx/buttonNav";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [credits, setCredits] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleAddToWatchlist = () => {
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Avoid duplicates
    const isAlreadyAdded = existing.find((item) => item.id === movie.id);
    if (!isAlreadyAdded) {
      const newWatchlist = [...existing, movie];
      localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
      alert("Added to watchlist");
    } else {
      alert("Movie already in watchlist");
    }
  };

  const handleAddToFavorites = () => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || []; 
    // Avoid duplicates
    const isAlreadyAdded = existing.find((item) => item.id === movie.id); 
    if (!isAlreadyAdded) {
      const newFavorites = [...existing, movie];  
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      alert("Added to favorites");  
    } else {
      alert("Movie already in favorites");
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      setMovie(data);
    };

    const fetchRelated = async () => {
      const res = await fetch(
        `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
      );
      const data = await res.json();
      setRelated(data.results || []);
    };

    async function fetchCredits() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const data = await res.json();
      setCredits(data);
    }

    async function fetchReviews() {
      const res = await fetch(
        `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`
      );
      const data = await res.json();
      setReviews(data.results.slice(0, 2));
    }

    fetchMovie();
    fetchRelated();
    fetchCredits();
    fetchReviews();
  }, [id]);

  const director = credits?.crew?.find((person) => person.job === "Director");
  const cast = credits?.cast?.slice(0, 4);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <SC.Main4 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
        <span className="flex justify-between items-center mb-5">
          <Link to="/Home">
            <ArrowLeft size={20} />
          </Link>
          <Link to="/home">
            <img src={logo} alt="" className="h-10" />
          </Link>
          <Link to="/library">
            <Bookmark size={20} className="float-right" />
          </Link>
        </span>
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-md mb-4 "
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 absolute top-4 right-5 w-10 h-10 text-white cursor-pointer hover:text-red-800 transition-colors duration-200"
            onClick={handleAddToFavorites}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>

        <div className=" px-3">
          <h1 className="text-[20px] text-left font-bold mb-3">
            {movie.title}
          </h1>
          <p className="mb-2 text-justify">{movie.overview}</p>

          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold mb-2">Cast</h2>
            <div className="flex items-center pl-2">
              {cast?.map((actor, index) => (
                <div
                  key={actor.id}
                  className={`w-12 h-12 rounded-full border-3 border-background overflow-hidden ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/60x60?text=No+Img"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Director and Ratings */}
          <div className="text-left mt-6 ">
            <p className="mb-1">
              <strong>Director:</strong> {director?.name}
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Ratings</h2>

            <div className="flex gap-6 mt-5">
              {/* Ratings Summary */}
              <div className="flex flex-col items-center justify-start w-[40%] mt-2">
                <span className="text-3xl font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-red-500 text-xl">★★★★★</span>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  {movie.vote_count?.toLocaleString()} reviews
                </p>
              </div>

              <div className="flex flex-col justify-between w-full gap-2">
                {[5, 4, 3, 2, 1].map((stars, i) => {
                  const percentage = 40 - i * 10;
                  return (
                    <div key={stars} className="flex items-center gap-2 w-full">
                      <p className="text-sm w-4">{stars}</p>
                      <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
                        <div
                          className="h-full bg-red-700"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold mb-3">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-400">
                No reviews available for this movie.
              </p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="my-1 py-4 text-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${review.author}&background=5E0B0B&color=fff`}
                      alt={review.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-xs">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 text-red-500 mb-2">
                    {"★★★★★".slice(
                      0,
                      Math.min(review.author_details.rating || 5, 5)
                    )}
                  </div>

                  <p className="text-gray-300">
                    {review.content.slice(0, 200)}...
                  </p>

                  <div className="mt-3 flex gap-4 text-xs text-gray-400">
                    <span>👍 {Math.floor(Math.random() * 20) + 1}</span>
                    <span>💬 {Math.floor(Math.random() * 5)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <h2 className="mt-4 text-xl text-left font-semibold mb-2">
            Related Movies
          </h2>
          <div className="custom-scroll flex gap-3 overflow-x-auto py-3">
            {related.map((relMovie) => (
              <div
                key={relMovie.id}
                className="bg-[rgba(153,27,27,0.7)] relative py-2 rounded-md min-w-[230px] min-h-[380px]"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${relMovie.poster_path}`}
                  alt={relMovie.title}
                  className=" w-[100%] absolute top-0 "
                />
                <p className="text-sm absolute bottom-2 left-3">
                  {relMovie.title}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddToWatchlist}
            className=" cursor-pointer mt-6 w-full bg-red-700 py-2 rounded-md mb-12 text-white hover:bg-red-800"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
      <BottomNav />
    </SC.Main4>
  );
}