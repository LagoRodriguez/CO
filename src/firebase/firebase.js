import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCC684L5cYGek_5nLrVlo6C1F6pC23UhcM",
    authDomain: "conline-33437.firebaseapp.com",
    projectId: "conline-33437",
    storageBucket: "conline-33437.appspot.com",
    messagingSenderId: "179781837305",
    appId: "1:179781837305:web:c2b85b28a22800cf435d28",
    measurementId: "G-TB7LK509JK"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const analytics = getAnalytics(app);

export {auth, db, storage, analytics};