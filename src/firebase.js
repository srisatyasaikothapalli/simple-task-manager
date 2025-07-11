// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add this line

const firebaseConfig = {
  apiKey: "AIzaSyACyQyBu3WZujewKNHb7XLpKjrj7CV4Rzg",
  authDomain: "task-manager-90ed1.firebaseapp.com",
  projectId: "task-manager-90ed1",
  storageBucket: "task-manager-90ed1.appspot.com",
  messagingSenderId: "234901107659",
  appId: "1:234901107659:web:36cd97ca7b259c5572fc4e",
  measurementId: "G-Q1N2S79TE2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Add this line

export { auth, db }; // ✅ Export both
