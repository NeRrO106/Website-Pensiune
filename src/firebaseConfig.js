import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK8L-QHGVhS0Jew3CwFs8vLfJJvN92Lo0",
  authDomain: "pensiune-d37bd.firebaseapp.com",
  projectId: "pensiune-d37bd",
  storageBucket: "pensiune-d37bd.firebasestorage.app",
  messagingSenderId: "874143023992",
  appId: "1:874143023992:web:1409e56543626c771afe8d",
  measurementId: "G-PZ1VB46H8F"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const analytics = getAnalytics(app);

export { db };