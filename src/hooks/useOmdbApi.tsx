import { useState, useCallback } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

// browse page dagi kinolar uchun
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Movie page dagi kino ma'lumotlari uchun
interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Writer: string;
  Actors: string;
  imdbRating: string;
  Genre: string;
  Runtime: string;
  Response: string;
  Error?: string;
}

// Search resultatlari uchun
interface SearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const useOmdbApi = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // browsing yoki searchingdagi kinolar
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null); // bir kino ma'lumotlari
  const [loading, setLoading] = useState(false); // loading statusi
  const [error, setError] = useState<string | null>(null);

  const searchMovies = useCallback(async (query: string, page: number = 1) => {
    // optimizatsiya uchun useCallback ishlatilgan
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}&s=${query}&page=${page}`);
      const data: SearchResult = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "An unknown error occurred.");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please check your network connection.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMovieDetails = useCallback(async (imdbID: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}&i=${imdbID}&plot=full`);
      const data: MovieDetails = await response.json();
      if (data.Response === "True") {
        setMovieDetails(data);
      } else {
        setError(data.Error || "An unknown error occurred.");
        setMovieDetails(null);
      }
    } catch (err) {
      setError("Failed to fetch movie details.");
      setMovieDetails(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMovieDetails = useCallback(() => {
    setMovieDetails(null);
    setError(null);
  }, []);

  return {
    movies,
    movieDetails,
    loading,
    error,
    searchMovies,
    getMovieDetails,
    clearMovieDetails,
  };
};
