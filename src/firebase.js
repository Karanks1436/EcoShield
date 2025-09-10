// Firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAAFpVnAfZWVg_XVga1pcbEHlnlrGvZ9Ik",
  authDomain: "eco-shield-green.firebaseapp.com",
  projectId: "eco-shield-green",
  storageBucket: "eco-shield-green.appspot.com",
  messagingSenderId: "715960415063",
  appId: "1:715960415063:web:a0d3302452546a7b6ec412",
  measurementId: "G-S9NJJS0G81"
};
// ✅ Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore reference
export const db = getFirestore(app);

// Optional: Storage reference
export const storage = getStorage(app);
export const auth = getAuth(app);