import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase Configuration
// Get these values from: https://console.firebase.google.com/
// Project Settings → Your Apps → Web App → Firebase SDK snippet

// Check if environment variables are loaded
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;

// Log if env variables are missing (debugging)
if (!apiKey || !projectId) {
  console.warn(
    "⚠️ Firebase environment variables may not be loaded. Ensure .env.local exists in your project root with REACT_APP_FIREBASE_* variables."
  );
}

const firebaseConfig = {
  apiKey: apiKey || "",
  authDomain: authDomain || "",
  projectId: projectId || "",
  storageBucket: storageBucket || "",
  messagingSenderId: messagingSenderId || "",
  appId: appId || "",
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  console.log("✓ Firebase initialized successfully");
} catch (error) {
  console.error("✗ Firebase initialization error:", error.message);
  console.error("Please check your Firebase configuration in .env.local");
}

export { auth, db, storage, app };
