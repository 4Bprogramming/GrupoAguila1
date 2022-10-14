import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createCase } from "../../../assets/Controller/llamados";
import { validate } from "./Validate";
import FormAddCase2 from "./FormAddCase2";
import AddModals from "../../Modals/AddModals";

function AddCases() {
  let namePeritos1 = useSelector((state) => state.peritosByName);
  let namePeritos = namePeritos1.map((e) => {
    return { value: e, label: e };
  });
  const [acept, setAcept]=useState(false)
  const [creado, setCreado]= useState(false)
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
  });

  const handleChange = (e) => {
    e.preventDefault();

    setPost({
      ...post,

      [e.target.name]: e.target.value,
    });
  };

  let handleSelect = (value, action) => {
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

  let handleClick=(e)=>{
    console.log('click')
    setAcept(true)
  }
  console.log('acept', acept)
  let cases = {
    Nombre: post.Nombre,
    Compañia: post.Compañia,
    Marca: post.Marca,
    Numero: post.Numero, //num de denuncia
    Patente: post.Patente,
    Vencimiento: post.dia + "-" + post.mes + "-" + post.año,
    celular: post.celular,
    direccion: post.direccion,
    estado: post.estado,
    localidad: post.localidad,
    perito: post.perito,
    notas: post.notas,
  };
  let cases1= Object.values(cases)
  console.log('cases1', cases1[0]);
  let body
  if(cases1[0]!=="" &&  cases1[1]!=="" && cases1[2]!=="" && cases1[3]!=="" && cases1[4]!=="" && cases1[5]!=="" && cases1[6]!=="" && cases1[7]!=="" && cases1[9]!=="" && cases1[10]!==""){
   body=[
      `Número de Denuncia : ${cases1[3]}`,
      `Compañia: ${cases1[1]}`,
      `Vencimiento: ${cases1[5]}`,
      `Marca: ${cases1[2]}`,
      `Patente: ${cases1[4]}`,
      `Numero de Contacto: ${cases1[6]}`,
      `Apellido y Nombre: ${cases1[0]}`,
      `Dirección: ${cases1[7]}`,
      `Localidad: ${cases1[9]}`,
      `Perito Asignado: ${cases1[10]}`
    ]
  }
  else{
    body=['Faltan completar Datos']
  }
  const handleSubmit = async (e) => {
    console.log('submitHecho')
    e.preventDefault();

    let error = await validate(post);

    if (Object.keys(error).length === 0) {
      try {
        createCase(cases);
      } catch (e) {
        console.log("error de firebase", error);
        alert(e);
      }
    } else {
      let errorA = Object.values(error);
      alert(`No se puede guardar el caso presenta el/los siguiente/s error/s:
               ${errorA}    
        `);
    }
    setCreado(true)
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
    })
  };
  return (
    <div style={{background:'blue', paddingTop:'0%'}}>
    
    {

    }
      <FormAddCase2
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleSelect={handleSelect}
        post={post}
        namePeritos={namePeritos}
        cases={body}
        style={{paddingRight: '30%',
      paddingLeft: '25%',
      marginTop: '20px'}}
      />
    </div>
  );
}

export default AddCases;
