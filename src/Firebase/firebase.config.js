// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTQl6S6NWT0Uwtu7fCSxTooOITGBn56AY",
  authDomain: "chef-bazar-f4791.firebaseapp.com",
  projectId: "chef-bazar-f4791",
  storageBucket: "chef-bazar-f4791.firebasestorage.app",
  messagingSenderId: "327896594768",
  appId: "1:327896594768:web:c11e6f26740b8a9458d455",
  measurementId: "G-6LHRQ44PH0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);