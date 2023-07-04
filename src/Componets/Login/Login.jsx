import React, { useState, useEffect } from "react";
import firebaseApp from "../../Credentials/Index";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { getCasesAction, getPeritos, peritosByName } from "../../Store/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../CustomHook/useLocalStorage";
//Alert notifications
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function Login() {
  const [emailUser, setEmailUser] = useLocalStorage('emailUser', '')
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPeritos());
    dispatch(getCasesAction());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(peritosByName());
    }, 2500);
  }, []);
  const firestore = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const peritos = useSelector((state) => state.peritos);

  async function loginEmailPassword(email, password) {
    signInWithEmailAndPassword(auth, email, password);
  }



  const submitHandlerGoogle = (e) => {
 //  console.log('e.target', e.target) 
    let booll = peritos.some((el) => el.email === "email");

    try {

      signInWithPopup(auth, googleProvider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credential)
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
     //   console.log('user', user)
        let userPerito1 = peritos.some((el) => el.email === user.email)

     //    console.log('userPerito1', userPerito1);
     //    console.log('Perito1', peritos);
        if (userPerito1) {
          setEmailUser(user.email)
          //GUARDAR EN EL LOCALSTORAGE USER.EMAIL
          navigate("/user");
        }
        else {
          NotificationManager.error('Comuniquese con el administrador','Atención, no puede iniciar sesión', 4000)
        }
        // ...
      })
    } catch (error) {
      return NotificationManager.error('Comuniquese con el administrador','Atención, no puede iniciar sesión', 4000)
    }

  };


  return (
    <>

      <div onClick={(e) => submitHandlerGoogle(e)}>Iniciar Sesión</div>
       {/* alert after submit */}
       <NotificationContainer/> 

    </>
  );
}

export default Login;

{
  /* <div className="contenedor">
<div className="sub-main">
  <div>
    <div className="imgs">
      <div className="container-image">
        <img src={profile} alt="profile" className="profile" />
      </div>
    </div>
    <h1>{registro ? "registrate" : "Inicia Sesión"}</h1>
    <br />
    <br />
    <form onSubmit={submitHandler}>
      <label>
        <input
          type="email"
          id="email"
          placeholder="Correo"
          className="name"
        />
      </label>
      <br />
      <br />
      <label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="name"
        />
      </label>
      <br />
      <br />
      <label>
        Rol
        <select id="rol" defaultValue="default">
          <option value="default" disabled hidden>
            Seleccione un Rol{" "}
          </option>
          <option value="superAdmin">Administrador</option>
          <option value="admin">Admin</option>
          <option value="perito">Perito</option>
        </select>
      </label>
      <br />
      <br />
      <button className="login-button" type="submit">
        {registro ? "registrate" : "Inicia Sesión"}
      </button>
    </form>
    <br />
    <br />
    <button
      className="registerbutton"
      onClick={() => setRegisto(!registro)}
    >
      {registro ? "Ya tengo Cuenta" : "Registrarse"}
    </button>
  </div>
</div>
</div> */
}
