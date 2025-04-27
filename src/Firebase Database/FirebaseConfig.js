// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Firebase initialization
import { getAuth } from "firebase/auth"; // Firebase authentication function     
import { getFirestore } from "firebase/firestore"; // ✅ Firestore added
import { getDatabase } from "firebase/database";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBpDp4pPn9ucNzO9wmYPhNyb0_qjiZU3AM",
//   authDomain: "team48-verde-c2395.firebaseapp.com",
//   databaseURL: "https://team48-verde-c2395-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "team48-verde-c2395",
//   storageBucket: "team48-verde-c2395.firebasestorage.app",
//   messagingSenderId: "256046721455",
//   appId: "1:256046721455:web:64a9a42b96512639f7275a"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDetiOAy6PqK1G7Elnp2zX7Poyl9x4lsYs",
  authDomain: "trial-verde-firestore-realtime.firebaseapp.com",
  databaseURL: "https://trial-verde-firestore-realtime-default-rtdb.firebaseio.com",
  projectId: "trial-verde-firestore-realtime",
  storageBucket: "trial-verde-firestore-realtime.firebasestorage.app",
  messagingSenderId: "247643878009",
  appId: "1:247643878009:web:bc8d04fd5c2d9c13a21aa8",
  measurementId: "G-DV4ZVDKSCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get
const authentication = getAuth(app);

// Access Firestore Database for User Logins
const db = getFirestore(app);

// Access Realtime Database for Sensor Readings
const sensor_db = getDatabase(app);

// export authentication for checking of credentials
// export db for storing Company Name and Username
export { authentication, db, sensor_db }; 