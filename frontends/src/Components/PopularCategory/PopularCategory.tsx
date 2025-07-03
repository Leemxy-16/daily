import React, { useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../api/tmdb"; // Adjust the path
import MovieCard from "../../../src/components/MovieCard/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const GENRES = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
};

export default function PopularCategories() {
  const [selectedGenre, setSelectedGenre] = useState<keyof typeof GENRES>("Action");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const genreId = GENRES[selectedGenre];
      const result = await fetchMoviesByGenre(genreId);
      setMovies(result);
    }

    loadMovies();
  }, [selectedGenre]);

  return (
    <section className="p-4 mb-6">
      <h2 className="text-xl text-left text-white font-bold mb-2"> Popular Categories</h2>

      <div className="flex space-x-3 mb-4">
        {Object.keys(GENRES).map((genre) => (
          <button
            key={genre}
            className={`px-4 py-1 rounded-xl text-sm font-medium ${
              selectedGenre === genre
                ? "bg-red-800 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-red-700"
            }`}
            onClick={() => setSelectedGenre(genre as keyof typeof GENRES)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="custom-scroll flex gap-4 overflow-x-auto py-3 mb-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    </section>
  );
}