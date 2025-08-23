// src/components/PrivateRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function PrivateRoute({ children }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setAuthed(!!u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) {
    // simple loader; swap for your spinner if you like
    return <div className="p-8 text-center text-sm text-gray-500">Loading…</div>;
  }

  return authed ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
