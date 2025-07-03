import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import logo from "/logo.png";
import NewRelease from "../components/newRelease/newRelease";
import Trending from "../components/Trending/trending";
import PopularCategories from "../Components/PopularCategory/PopularCategories";
import BottomNav from "../Components/BottomNav.tsx/bottonNav";
import * as SC from "../../style";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    async function loadMovies() {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }

    loadMovies();
  }, []);

  return (
    <SC.Main2 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
        <div className="flex justify-between items-center p-4">
          <Link to="/home">
            <img src={logo} alt="" className="h-10" />
          </Link>
          <h2 className="text-[16px] font-semibold text-transform: capitalize">
            Welcome, {username || "Guest"}
          </h2>
          <Link to="/profile">
            <UserCircle
              size={28}
              className="text-light-text hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        <Trending />
        <NewRelease />
        <PopularCategories />
        <div className="fixed bottom-0 w-full max-w-md bg-input text-white py-3 flex justify-between items-center shadow-inner z-50">
          <BottomNav />
        </div>
      </div>
    </SC.Main2>
  );
}