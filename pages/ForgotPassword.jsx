import React, { useContext, useRef } from "react";
import { UserContext } from "../sources/context/UserContext";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const navigate = useNavigate();
  const { forgotPassword } = useContext(UserContext);

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    console.log(email);
    if (email)
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
        navigate("/login");
      });
  };

  return (
    <>
      <h1 className="title-forgot-password">Réinitilisation du mot de passe</h1>
      <div className="form-box-forgot-password">
        {/* <form onSubmit={onSubmit}> */}
        <div>
          <label>Adresse mail </label>
          <input type="email" placeholder="Adresse mail" ref={emailRef} />
        </div>

        <button
          onClick={forgotPasswordHandler}
          className="send-email-forgot-pwd"
        >
          Envoyer
        </button>
        {/* </form> */}
      </div>
      <div className="container-link-login">
        <span>Revenir sur la page de connexion</span>
        <Link to="/login" className="link-login">
          Connexion
        </Link>
      </div>
    </>
  );
}
