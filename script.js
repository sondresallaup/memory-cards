// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZKsWO1Od5ZFqEyWeXDWx0nNkybTJE6UM",
  authDomain: "memory-card-game-88f6d.firebaseapp.com",
  projectId: "memory-card-game-88f6d",
  storageBucket: "memory-card-game-88f6d.appspot.com",
  messagingSenderId: "681065124262",
  appId: "1:681065124262:web:aa1274680d805fe1b77f67",
  measurementId: "G-395RZFB51C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore setup
const db = getFirestore(app);

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
// addHighscore("Test User", 100);

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
// getHighscores();

function showStartScreen() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = ""; // Clear the game board

  const startScreen = document.getElementById("start-screen");
  startScreen.innerHTML = `
    <h1>Memory Card Game</h1>
    <p>Click on the cards to find matching pairs</p>
    <button id="startGame">Start Game</button>
  `;

  gameBoard.appendChild(startScreen);

  const startButton = document.getElementById("startGame");
  startButton.addEventListener("click", () => {
    setUpGame();
  });
}

showStartScreen();


function setUpGame() {
  // Configuration
  const totalImageCount = 18; // Total number of images in the cardimages folder
  const uniqueImageCount = 8; // Number of unique images required for the board
  const cardFolder = "cardimages/";

  // Clear the start screen
  const startScreen = document.getElementById("start-screen");
  startScreen.innerHTML = "";

  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = ""; // Clear the game board

  // Generate an array of unique random image indices
  function getRandomImageIndices(total, needed) {
    const indices = [];
    while (indices.length < needed) {
      const randIndex = Math.floor(Math.random() * total);
      if (!indices.includes(randIndex)) {
        indices.push(randIndex);
      }
    }
    return indices;
  }

  // Select and shuffle images
  const selectedImages = getRandomImageIndices(totalImageCount, uniqueImageCount);
  const shuffledImages = [...selectedImages, ...selectedImages].sort(() => 0.5 - Math.random());

  // Render the game board
  shuffledImages.forEach((imageIndex) => {
    // Create the card container
    const card = document.createElement("div");
    card.classList.add("card");

    // Create the inner wrapper
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    // Create the front face
    const frontFace = document.createElement("div");
    frontFace.classList.add("front");
    const frontImage = document.createElement("img");
    frontImage.src = `${cardFolder}${imageIndex}.jpg`;
    frontImage.alt = `Card ${imageIndex}`;
    frontFace.appendChild(frontImage);

    // Create the back face
    const backFace = document.createElement("div");
    backFace.classList.add("back");

    // Append front and back to cardInner
    cardInner.appendChild(frontFace);
    cardInner.appendChild(backFace);

    // Append cardInner to card container
    card.appendChild(cardInner);

    // Add card to the game board
    gameBoard.appendChild(card);

    // Add click listener for flipping cards
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
      checkMatch(card);
    });
  });

  // Match logic
  let flippedCards = [];
  let matchedPairs = 0; // Track the number of matched pairs
  const totalPairs = uniqueImageCount; // Total number of pairs required to complete the game

  function checkMatch(card) {
    gameBoard.classList.add("disabled");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      const firstImage = firstCard.querySelector(".front img").src;
      const secondImage = secondCard.querySelector(".front img").src;

      if (firstImage === secondImage) {
        console.log("Match found!");
        matchedPairs++;

        // Check if all pairs are matched
        if (matchedPairs === totalPairs) {
          console.log("Board completed! 🎉");
          setTimeout(() => {
            alert("Congratulations! You've completed the game!");
          }, 500);
        }

        gameBoard.classList.remove("disabled");
        flippedCards = []; // Reset flipped cards
      } else {
        console.log("No match!");
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          gameBoard.classList.remove("disabled");
          flippedCards = [];
        }, 1000); // Flip back after 1 second
      }
    } else {
      setTimeout(() => {
        gameBoard.classList.remove("disabled");
      }, 500);
    }
  }


  // Debugging helpers
  console.log("Selected images:", selectedImages);
  console.log("Shuffled images:", shuffledImages);
}

