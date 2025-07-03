import MovieCard from "../../../src/components/MovieCard/MovieCard";
import React, { useEffect, useState } from "react";
import { fetchNewReleases } from "../../api/tmdb"; // Adjust path based on your folder structure

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function NewRelease() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadNewReleases() {
      try {
        const releases = await fetchNewReleases();
        setMovies(releases);
      } catch (error) {
        console.error("Failed to fetch new releases:", error);
      }
    }

    loadNewReleases();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-white text-xl font-bold mb-4 text-left">
        New Releases
      </h2>
      <div className="custom-scroll flex gap-4 overflow-x-auto py-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}