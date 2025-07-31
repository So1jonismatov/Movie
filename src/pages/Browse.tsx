import { useEffect, useState } from "react";
import { useOmdbApi } from "@/hooks/useOmdbApi";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const popularSearches = [
  "star wars",
  "avengers",
  "matrix",
  "inception",
  "lord of the rings",
  "terminator",
  "jurassic park",
  "alien",
  "blade runner",
  "superman",
]; // API da random yoki hammasini list qilish imkoniyati mavjud emas ekan, improvizatsiya qilganman

export default function Browse() {
  const { movies, loading, error, searchMovies } = useOmdbApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      searchMovies(query);
    } else {
      const randomQuery =
        popularSearches[Math.floor(Math.random() * popularSearches.length)];
      searchMovies(randomQuery);
    }
  }, [searchParams, searchMovies]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setSearchParams({ q: searchTerm });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Browse Movies</h1>
        <div className="relative w-full max-w-sm">
          <Input
            type="search"
            placeholder="Search for a movie..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-destructive">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-gray-400">
          No movies found. Try another search!
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies
          .filter((movie) => movie.imdbID)
          .map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <div className="bg-card rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450"
                  }
                  alt={movie.Title}
                  className="w-full h-[450px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate">{movie.Title}</h3>
                  <p className="text-sm text-gray-400">{movie.Year}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
