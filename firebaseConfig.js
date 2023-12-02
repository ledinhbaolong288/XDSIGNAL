import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDobK4goH1CUzZuV_xlcOPfjqG-w9cVBdM",
  authDomain: "xdtrader-b1797.firebaseapp.com",
  projectId: "xdtrader-b1797",
  storageBucket: "xdtrader-b1797.appspot.com",
  messagingSenderId: "934879816414",
  appId: "1:934879816414:web:a5843655b76e2e8f79f04f",
  measurementId: "G-0E5WBJ7XDP"
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DBR = getDatabase(FIREBASE_APP)