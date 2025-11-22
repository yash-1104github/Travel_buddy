import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ai-trip-planner-13ed9.firebaseapp.com",
    projectId: "ai-trip-planner-13ed9",
    storageBucket: "ai-trip-planner-13ed9.firebasestorage.app",
    messagingSenderId: "392687996319",
    appId: "1:392687996319:web:aa1520e28225f7f62f41aa",
    measurementId: "G-SCVFE9DBH2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
