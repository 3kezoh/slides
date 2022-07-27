import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFt86s4pY1KIKCwI-HhHVhT9O5TBxNFpk",
  authDomain: "pwa-project-c753c.firebaseapp.com",
  databaseURL:
    "https://pwa-project-c753c-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "pwa-project-c753c",
  storageBucket: "pwa-project-c753c.appspot.com",
  messagingSenderId: "63632905512",
  appId: "1:63632905512:web:c3d17fb7ef0befb65dac1d",
  measurementId: "G-QQQQQQQQQQ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
