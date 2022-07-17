import React, { useContext, useState, useRef } from "react";
import { auth } from "../sources/components/firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import '../styles/login.css';
import { UserContext } from "../sources/context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn } = useContext(UserContext);
  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  // Ref permet de faire des références, sélection des éléments avec React
  const inputs = useRef([]);
  const addInputs = el => {
    if(el && !inputs.current.includes(el)) {
      inputs.current.push(el); // va rajouter tous les éléments dans le tableau inputs
    }
  }

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      // retourne l'objet crée
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value,
      )
      setValidation("");
      navigate("/");

    } catch {
        setValidation("Identifiant ou mot de passe incorrect");
    }
  }

  const test = () => {
    <forgotPassword />
  }

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
      <h1 className="title-login">Connexion</h1>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input ref={addInputs} type="text" className="login__input" placeholder="Adresse mail" />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input ref={addInputs} type="password" className="login__input" placeholder="Mot de passe" />
              </div>
              <button className="button login__submit">
                <span className="button__text">Se connecter</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>				
            </form>
            <button className="button-google" onClick={signInWithGoogle}>
              <i className="fab fa-google"></i>Sign in with google
            </button>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>		
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>		
        </div>
      </div>
      
      
      
    </div>
  );
};

export default Login;
