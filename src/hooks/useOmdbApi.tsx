import { useState, useCallback } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Interface for the detailed movie information
interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Writer: string;
  Actors: string;
  imdbRating: string;
  Genre: string;
  Runtime: string;
  Response: string; // OMDb includes a 'Response' field in details as well
  Error?: string;
}

// Interface for the overall search API response
interface SearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const useOmdbApi = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = useCallback(async (query: string, page: number = 1) => {
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
      setError(
        "Failed to fetch movie details. Please check your network connection.",
      );
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
