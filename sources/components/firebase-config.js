import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFt86s4pY1KIKCwI-HhHVhT9O5TBxNFpk",
  authDomain: "pwa-project-c753c.firebaseapp.com",
  projectId: "pwa-project-c753c",
  storageBucket: "pwa-project-c753c.appspot.com",
  messagingSenderId: "63632905512",
  appId: "1:63632905512:web:c3d17fb7ef0befb65dac1d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);