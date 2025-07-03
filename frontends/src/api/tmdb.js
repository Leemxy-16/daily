/// <reference types="vite/client" />

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTrendingMovies() {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

export async function fetchNewReleases() {
  const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

export async function fetchMoviesByGenre(genreId: number) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
}

