// guard route that requires authenticated user
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// private route component
export default function PrivateRoute({ children }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();

  // watch auth state and set readiness
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setAuthed(!!u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) {
    // initial loading indicator
    return <div className="p-8 text-center text-sm text-gray-500">loading…</div>;
  }

  return authed ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
