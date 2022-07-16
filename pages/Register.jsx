import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../sources/context/userContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { signUp } = useContext(UserContext);
  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  // Ref permet de faire des références, sélection des éléments avec React
  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el); // va rajouter tous les éléments dans le tableau inputs
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    //Faire une validation côté front
    if ((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
      setValidation("6 caractères min");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // retourne l'objet crée
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      formRef.current.reset();
      setValidation("");
      console.log(cred);
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setValidation("Le format de l'email est invalide");
      }

      if (err.code === "auth/email-alrea-in-use") {
        setValidation("L'email est déjà utilisé");
      }
    }
  };

  return (
    <>
      <h1 className="title-register">Inscription</h1>
      <div className="form-box">
        <p className="validation-text">{validation}</p>
        <form ref={formRef} onSubmit={handleForm}>
          <div>
            <label htmlFor="inputEmail">Email</label>
            <input
              ref={addInputs}
              type="email"
              name="email"
              id="inputEmail"
              required
            />
          </div>
          <div>
            <label htmlFor="inputPassword">Mot de passe</label>
            <input
              ref={addInputs}
              type="password"
              name="password"
              id="inputPassword"
              required
            />
          </div>
          <div>
            <label htmlFor="inputRepeatPassword">
              Confirmation du mot de passe
            </label>
            <input
              ref={addInputs}
              type="password"
              name="password"
              id="inputRepeatPassword"
              required
            />
          </div>

          <button className="submit-button">S'inscrire</button>
        </form>
      </div>
      <div className="container-link-login">
        <span>Vous avez déjà un compte ?</span>
        <Link to="/login" className="link-login">
          Connexion
        </Link>
      </div>
    </>
  );
}
