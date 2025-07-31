import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOmdbApi } from "@/hooks/useOmdbApi";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Movie() {
  const { id } = useParams<{ id: string }>();
  const { movieDetails, loading, error, getMovieDetails, clearMovieDetails } =
    useOmdbApi();

  useEffect(() => {
    if (id) {
      getMovieDetails(id);
    }
    return () => {
      clearMovieDetails();
    };
  }, [id, getMovieDetails, clearMovieDetails]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-destructive">
        {error}
      </div>
    );
  }

  if (!movieDetails) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src={
            movieDetails.Poster !== "N/A"
              ? movieDetails.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movieDetails.Title}
          className="rounded-lg w-full md:w-[300px] shrink-0 shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-bold mb-2">
            {movieDetails.Title}
          </h1>
          <div className="flex flex-wrap items-center text-gray-400 mb-4 gap-x-2">
            <span>{movieDetails.Year}</span>
            <span className="hidden sm:inline">|</span>
            <span>{movieDetails.Genre}</span>
            <span className="hidden sm:inline">|</span>
            <span>{movieDetails.Runtime}</span>
          </div>
          <p className="mb-6 text-lg leading-relaxed">{movieDetails.Plot}</p>
          <div className="space-y-2 text-md">
            <p>
              <strong>Director:</strong> {movieDetails.Director}
            </p>
            <p>
              <strong>Writer:</strong> {movieDetails.Writer}
            </p>
            <p>
              <strong>Actors:</strong> {movieDetails.Actors}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {movieDetails.imdbRating}/10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
