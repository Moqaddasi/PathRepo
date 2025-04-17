import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-5tJcyaUxr9IQPBQjTcrxt4_MBULKUuU",
    authDomain: "archpatterns-ed7a6.firebaseapp.com",
    databaseURL: "https://archpatterns-ed7a6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "archpatterns-ed7a6",
    storageBucket: "archpatterns-ed7a6.firebasestorage.app",
    messagingSenderId: "276071548666",
    appId: "1:276071548666:web:6e25a71d20436e327dab43",
    measurementId: "G-ZEJW8Q7WP8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
