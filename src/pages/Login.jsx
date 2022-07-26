import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { auth } from "../services/firebase-config";

import "../styles/login.css";

const Login = () => {
  const signInWithOauth = (type) => {
    let provider;
    switch (type) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "github":
        provider = new GithubAuthProvider();
        break;
    }
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <div class="login-buttons">
        <h1 className="title-login">Connexion</h1>
        <GoogleLoginButton onClick={() => signInWithOauth("google")}>
          <span>Se connecter avec Google</span>
        </GoogleLoginButton>
        <GithubLoginButton onClick={() => signInWithOauth("github")}>
          <span>Se connecter avec Github</span>
        </GithubLoginButton>
      </div>
    </>
  );
};

export default Login;
