// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZKsWO1Od5ZFqEyWeXDWx0nNkybTJE6UM",
  authDomain: "memory-card-game-88f6d.firebaseapp.com",
  projectId: "memory-card-game-88f6d",
  storageBucket: "memory-card-game-88f6d.firebasestorage.app",
  messagingSenderId: "681065124262",
  appId: "1:681065124262:web:aa1274680d805fe1b77f67",
  measurementId: "G-395RZFB51C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Firestore setup (ensure this matches your initialized Firebase app)
const db = getFirestore();

// Function to add test data
async function addHighscore(name, score) {
  try {
    const docRef = await addDoc(collection(db, "highscores"), {
      name: name,
      score: score,
      timestamp: new Date() // Optional: Add a timestamp for sorting
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Test the function
addHighscore("Test User", 100);

// Function to fetch data
async function getHighscores() {
  try {
    const querySnapshot = await getDocs(collection(db, "highscores"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
  } catch (e) {
    console.error("Error retrieving documents: ", e);
  }
}

// Test the function
getHighscores();
