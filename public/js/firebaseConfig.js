// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwZ9sI-KLxme8jko-PmoHWgFlBsnNamSo",
  authDomain: "job-listing-portal-d5be3.firebaseapp.com",
  projectId: "job-listing-portal-d5be3",
  storageBucket: "job-listing-portal-d5be3.firebasestorage.app",
  messagingSenderId: "663165092024",
  appId: "1:663165092024:web:3d8b4c8859aa0eedea344d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase references
const auth = firebase.auth();
const db = firebase.firestore();
