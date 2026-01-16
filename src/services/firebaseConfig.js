import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBMJzJxDXEPrRvMkZrWxL9GtM6eaKpL0Ew",
  authDomain: "job-listing-portal-12345.firebaseapp.com",
  projectId: "job-listing-portal-12345",
  storageBucket: "job-listing-portal-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
