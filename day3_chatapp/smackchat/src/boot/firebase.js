// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAlcCIzsjzSFS9EQqfloj-ILGrndn-QaTg",
  authDomain: "smackchat-35788.firebaseapp.com",
  databaseURL: "https://smackchat-35788.firebaseio.com",
  projectId: "smackchat-35788",
  storageBucket: "smackchat-35788.appspot.com",
  messagingSenderId: "986790640689",
  appId: "1:986790640689:web:44f6581c8535358ac3a910",
  measurementId: "G-3SSBJFB2DD"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
