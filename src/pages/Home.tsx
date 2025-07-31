import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/browse?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to MovieApp</h1>
      <p className="text-lg text-gray-400 mb-8">
        Your go-to place for movie information.
      </p>
      <div className="relative w-full max-w-md">
        <Input
          type="search"
          placeholder="Search for a movie..."
          className="pl-10 h-12 text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      <div className="mt-8">
        <Link to="/browse" className="text-lg text-primary hover:underline">
          or browse all movies
        </Link>
      </div>
    </div>
  );
}
