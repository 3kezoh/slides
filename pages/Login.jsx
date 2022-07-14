import React from "react";
import { auth } from "../sources/components/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button className="button" onClick={signInWithGoogle}>
        <i className="fab fa-google"></i>Sign in with google
      </button>
    </div>
  );
};

export default Login;
