// src/firebase.js

import { initializeApp } from "firebase/app";
//:import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaCOiyDv9_ALHFohKIvdI3Ns9VL21VhHg",
  authDomain: "music-marketplace-1c165.firebaseapp.com",
  projectId: "music-marketplace-1c165",
  storageBucket: "music-marketplace-1c165.appspot.com", 
  messagingSenderId: "168401560596",
  appId: "1:168401560596:web:f172365c1e3d7d71057301",
  measurementId: "G-GM991K81PT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
//: const analytics = getAnalytics(app);

export const auth = getAuth(app);
