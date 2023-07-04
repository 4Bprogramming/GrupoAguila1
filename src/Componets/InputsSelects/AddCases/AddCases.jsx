import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCase } from "../../../Controller/llamados";
import { validate } from "./Validate";
import FormAddCase2 from "./FormAddCase2";
import {
  getCasesAction,
  getPeritos,
  peritosByName,
  postWhatsapp,
} from "../../../Store/Actions/index";
import { Alert } from "react-bootstrap";
//Alert notifications
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useRef } from "react";

function AddCases() {
  const dispatch = useDispatch();
  let namePeritos1 = useSelector((state) => state.peritosByName);
  let peritos = useSelector((state) => state.peritos);
  let casesAll = useSelector((state) => state.cases);
  let casesFilter= casesAll.filter(e=>!e.hasOwnProperty('bandera') || e.bandera==='false')
  let namePeritos = namePeritos1.map((e) => {
    return { value: e, label: e };
  });
  function Actualizacion() {
    // console.log('entré en Actualizacion');
    dispatch(getPeritos());
    dispatch(getCasesAction());
    setTimeout(() => {
      dispatch(peritosByName());
    }, 2500);
  }

  const [show, setShow] = useState(false);
  const [showE, setShowE] = useState(false);
  const [err, setErr] = useState({});

  const [created, setCreated] = useState("");
  const [post, setPost] = useState({
    Nombre: "",
    Compañia: "",
    Marca: "",
    Numero: "", //num de denuncia
    Patente: "",
    dia: "",
    mes: "",
    año: "",
    celular: "",
    direccion: "",
    estado: "",
    localidad: "",
    perito: "",
    notas: "",
    taller:""
  });
  //======= HANDLE CHANGE ==================
  const handleChange = (e) => {
    e.preventDefault();

    setPost({
      ...post,

      [e.target.name]: e.target.value,
    });
  };
  //======= HANDLE SELECT ==================
  let handleSelect = (value, action) => {
   // console.log('valor que llega', value )
    if (action.name === "day") {
      setPost({
        ...post,
        dia: value.value,
      });
    }
    if (action.name === "month") {
      setPost({
        ...post,
        mes: value.value,
      });
    }
    if (action.name === "year") {
      setPost({
        ...post,
        año: value.value,
      });
    }

    if (action.name === "localidad") {
      setPost({
        ...post,
        localidad: value.value,
      });
    }
    if (action.name === "peritos") {
      setPost({
        ...post,
        perito: value.value,
      });
    }
  };
  //======= VARIABLES ==================
  let cases = {
    Vencimiento: post.dia + "-" + post.mes + "-" + post.año,
    Numero: post.Numero, //num de denuncia
    Compañia: post.Compañia?.split(" ").map((el) => el.charAt(0).toUpperCase() + el.toLowerCase().slice(1)).join(" "),
    Nombre: post.Nombre?.split(" ").map((el) => el.charAt(0).toUpperCase() + el.toLowerCase().slice(1)).join(" "),
    Patente: post.Patente?.toLocaleUpperCase(),
    Marca: post.Marca?.split(" ").map((el) => el.charAt(0).toUpperCase() + el.toLowerCase().slice(1)).join(" "),
    direccion: post.direccion?.split(" ").map((el) => el.charAt(0).toUpperCase() + el.toLowerCase().slice(1)).join(" "),
    localidad: post.localidad,
    celular: "+54" + post.celular,
    estado: post.estado,
    perito: post.perito,
    notas: post.notas,
    taller:post.taller
  };
  let cases1 = Object.values(cases);

  let body;
  if (
    cases1[0] !== "" &&
    cases1[1] !== "" &&
    cases1[2] !== "" &&
    cases1[3] !== "" &&
    cases1[4] !== "" &&
    cases1[5] !== "" &&
    cases1[6] !== "" &&
    cases1[7] !== "" &&
    cases1[8] !== "" &&
    cases1[10] !== ""
  ) {
    body = [
      `Número de Denuncia : ${cases1[1]}`,
      `Compañia: ${cases1[2]}`,
      `Vencimiento: ${cases1[0]}`,
      `Marca: ${cases1[5]}`,
      `Patente: ${cases1[4]}`,
      `Numero de Contacto: ${cases1[8]}`,
      `Apellido y Nombre: ${cases1[3]}`,
      `Dirección: ${cases1[6]}`,
      `Localidad: ${cases1[7]}`,
      `Perito Asignado: ${cases1[10]}`,
    ];
  } else {
    body = ["Faltan completar Datos"];
  }
  // console.log("body", body);
 
  //======= HANDLE SUBMIT ==================
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('e', e)

    let error = await validate(post);
    if(casesFilter.some(e=>e.Numero===cases.Numero && e.Compañia===cases.Compañia)){
      NotificationManager.error('ATENCION!',"El caso YA EXISTE!", 5000);
      return  Actualizacion();
    }
    if (Object.keys(error).length === 0) {
      try {
          // console.log('entra al try???');
        createCase(cases);
        // console.log('1')
      
        let peritoWhatsap = peritos.find((el) => el.nombre === post.perito);
        // console.log('2')
        let body = {
          token: "ppxsdnbulhx73mnv",
          to: `${peritoWhatsap.celular}`,
          body: `${peritoWhatsap.nombre} se te ha asignado una nueva pericia:
          N° de denuncia: ${cases.Numero}`,
          priority: "10",
        };
        // console.log('3==>', body)
        let bodyMsgAsegurado= {
          token: "ppxsdnbulhx73mnv", 
          to: `${cases.celular}`,
          body: `${cases.Nombre} le informamos que su caso ya ha sido asignado a nuestro perito.
          Para mayor información ingrese a nuestra página https://www.grupoaguilasrl.com 
          con el N° de denuncia ${cases.Numero}`,
          priority: "10", 

        }
        // console.log('4===>',bodyMsgAsegurado)
        setCreated(cases.Numero);
        // console.log('5===>', created)
        setShow(true);
        dispatch(postWhatsapp(body));
        dispatch(postWhatsapp(bodyMsgAsegurado));
        NotificationManager.success('Bien Hecho!',"El caso fue añadido!", 3000);
        Actualizacion();

        
        setPost({
          Nombre: "",
          Compañia: "",
          Marca: "",
          Numero: "",
          Patente: "",
          dia: "",
          mes: "",
          año: "",
          celular: "",
          direccion: "",
          estado: "",
          localidad: "",
          perito: "",
          notas: "",
          taller: ""
        });
      } catch (e) {
        console.log("error de firebase", error);
      }
    } else {
      let errorA = Object.values(error);
     // console.log('6===>', errorA)
      setShowE(true);
      setErr(errorA);
      // alert(`No se puede guardar el caso presenta el/los siguiente/s error/s:
      //          ${errorA}
      //   `);
    }
  };
  return (
    <div style={{ paddingTop: "0%" }}>
      {showE && (
        <div
          style={{
            paddingRight: "10%",
            paddingLeft: "25%",
            marginTop: "10px",
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-between",
          
          }}
        >
          <Alert
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
            style={{ paddingRight: "8%", paddingLeft: "5%" }}
          >
            <Alert.Heading>
              <p style={{ color: "black", fontSize: "15px" }}>
                No se puede guardar el caso presenta el/los siguiente/s error/s:
              </p>
              {err?.map((el) => {
                return <ol style={{ fontSize: "15px" }}>{el}</ol>;
              })}
            </Alert.Heading>
          </Alert>
        </div>
      )}
      <FormAddCase2
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleSelect={handleSelect}
        post={post}
        namePeritos={namePeritos}
        cases={body}
     
        
        // style={{ paddingRight: "30%", paddingLeft: "25%", marginTop: "20px",   backgroundColor:"opacity" }}
      />
      <NotificationContainer />
    </div>
  );
}

export default AddCases;
