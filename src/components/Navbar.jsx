// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token"); // if you store one
      navigate("/login");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const initial =
    user?.email?.charAt(0)?.toUpperCase() ||
    user?.displayName?.charAt(0)?.toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-700 bg-black/90 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight text-white">
            Music Marketplace
          </Link>

          <div className="flex items-center gap-4 text-sm text-white">
            <Link className="hover:text-blue-400 transition" to="/">
              Home
            </Link>
            <Link className="hover:text-blue-400 transition" to="/upload">
              Upload
            </Link>
            <Link className="hover:text-blue-400 transition" to="/dashboard">
              Dashboard
            </Link>
            {user && (
              <>
                <Link className="hover:text-blue-400 transition" to="/owned-music">
                  My Music
                </Link>
                <Link className="hover:text-blue-400 transition" to="/profile">
                  Profile
                </Link>
              </>
            )}

            {!user ? (
              <Link
                className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700 transition"
                to="/login"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-gray-300">
                  {user.email || user.displayName}
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gray-600 text-white">
                  {initial || "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-gray-600 px-3 py-1.5 text-white hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
