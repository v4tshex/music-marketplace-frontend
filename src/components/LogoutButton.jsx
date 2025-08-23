import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // adjust if your firebase file is somewhere else

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      localStorage.removeItem("token"); // if you store token
      window.location.href = "/login"; // redirect to login
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
      Logout
    </button>
  );
}

export default LogoutButton;
