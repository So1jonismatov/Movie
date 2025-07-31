import { Outlet, Link } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <div>
      <header className="border-b">
        <div className="container mx-auto px-4">
          <nav className="py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              MovieApp
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/browse"
                className="text-sm font-medium text-gray-400 hover:text-white"
              >
                Browse
              </Link>
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
