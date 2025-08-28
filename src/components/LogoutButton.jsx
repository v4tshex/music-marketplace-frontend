// button that signs the user out
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 

// logout button component
function LogoutButton() {
  // sign out and clear client state
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      localStorage.removeItem("token"); 
      window.location.href = "/login"; 
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
