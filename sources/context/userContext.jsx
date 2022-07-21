import React, { createContext, useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../services/firebase-config";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  console.log("MAJ", currentUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ signUp, currentUser, signIn, forgotPassword }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
