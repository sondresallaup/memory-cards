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
