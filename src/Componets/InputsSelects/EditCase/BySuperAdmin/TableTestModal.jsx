import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select"
import { editCasos, updateCases } from "../../../../Controller/llamados";
import { useDispatch, useSelector } from "react-redux";
import {stateCase, location, customStyles, customStyles1} from '../../AddCases/utilsFunctions';
import PropTypes from "prop-types";
import { postWhatsapp } from "../../../../Store/Actions";
import "../TableTestModal.css";

//Alert notifications
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import AddModals from "../../../Modals/AddModals";


const TableTestModal = (props) => {
    let peritos = useSelector((state) => state.peritos);
    let namePeritos1 = useSelector((state) => state.peritosByName);
    let namePeritos = namePeritos1.map((e) => {
    return { value: e, label: e }; 
  });
    const caseData = props.caseData[0];
    const  [editFormInput, setEditFormInput] = useState({});
    const dispatch = useDispatch();
  useEffect(()=>{
        setEditFormInput({
            Vencimiento:caseData?.Vencimiento,
            Numero:caseData?.Numero,
            Compañia:caseData?.Compañia,
            Nombre:caseData?.Nombre,
            Patente:caseData?.Patente,
            Marca:caseData?.Marca,
            direccion:caseData?.direccion,
            localidad:caseData?.localidad,
            celular:caseData?.celular,
            estado:caseData?.estado,
            perito:caseData?.perito,
            notas:caseData?.notas,
            taller:caseData?.taller
        })
  },[props])
  /* console.log("caseData", caseData); */

  
  //========== HANDLE CHANGE =======
  function handleOnChange(e) {
      e.preventDefault();
      if (e.target.value !== undefined) {
          setEditFormInput({ ...editFormInput, [e.target.name]: e.target.value });
        }
        else{
            let  nameL = e.target.name
            setEditFormInput({...editFormInput,[e.target.name]:caseData[e.target.name]})
        }
    }
//========== HANDLE SELECT =======
    let handleSelect = (value, action) => {
      if (action.name === "estado") {
        setEditFormInput({
          ...editFormInput,
          estado: value.value,
        });
      }
  
      if (action.name === "localidad") {
        setEditFormInput({
          ...editFormInput,
          localidad: value.value,
        });
      }
      if (action.name === "peritos") {
        setEditFormInput({
          ...editFormInput,
          perito: value.value,
        });
      }
    };
    //======= VARIABLES ==================
  let cases = {
    Vencimiento: editFormInput.Vencimiento, 
    Numero: editFormInput.Numero, //num de denuncia
    Compañia: editFormInput.Compañia?.split(" ")
      .map((el) => el.charAt(0).toUpperCase() + el.toLowerCase().slice(1))
      .join(" "),
    Nombre: editFormInput.Nombre?.split(" ")
      .map((el) => el.charAt(0).toUpperCase() + el.toLowerCase().slice(1))
      .join(" "),
    Patente: editFormInput.Patente?.toLocaleUpperCase(),
    Marca: editFormInput.Marca?.split(" ")
      .map((el) => el.charAt(0).toUpperCase() + el.toLowerCase().slice(1))
      .join(" "),
    direccion: editFormInput.direccion?.split(" ")
    .map((el) => el.charAt(0).toUpperCase() + el.toLowerCase().slice(1))
    .join(" "), 
    localidad: editFormInput.localidad,
    celular: editFormInput.celular,
    estado: editFormInput.estado,
    perito: editFormInput.perito,
    notas: editFormInput.notas,
    taller: editFormInput.taller
  };
let cases1=Object.values(cases);
// console.log('cases1', cases1);
let body = [
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
  `Notas: ${cases1[11]}`,
  `Repuestos/Taller: ${cases1[12]}`,
   
];

  //========== HANDLE SUBMIT =======
  /* console.log('editForm', editFormInput) */
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      let edit = await updateCases(props.caseData[0]?.id, cases);
      
  
      //  console.log('caseData[0].id',caseData[0]?.id)
      let peritoWhatsap = peritos.find(
        (el) => el.nombre === editFormInput.perito
      );
      
      

      //it closes the Modal after submit
      props.close()

      //this commando triggers the alert! 
      NotificationManager.success('Bien Hecho!', 'Campo actualizado!',3000);  
      //actualiza el estado con el cambio
      props.actualizar()
      
      let body = {
           token: "ppxsdnbulhx73mnv",
          to: `${peritoWhatsap.celular}`,
          body: `${peritoWhatsap.nombre} se ha modificado su caso: 
          N° de denuncia: ${editFormInput.Numero}`,
          priority: "10",
        };
        dispatch(postWhatsapp(body));
         
              props.close();
           
    } catch (error) {console.log(e)}
  }

  
  return (
    <>
      
      <Modal show={props.show}>
        <Modal.Header closeButton onHide={props.close}>
          <Modal.Title>Edite la informacion del siniestro </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label className="tableTestModalLabel">Vencimiento: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Vencimiento: ${props.caseData[0]?.Vencimiento}`}
              name="Vencimiento"
              value={editFormInput.Vencimiento}
              onChange={handleOnChange}

            />
            <br />
            <Form.Label className="tableTestModalLabel">Número de denuncia: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Denuncia: ${props.caseData[0]?.Numero}`}
              name="Numero"
              value={editFormInput.Numero}
              onChange={handleOnChange}
            />
            <br />
            <Form.Label className="tableTestModalLabel">Compañía: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Compañía: ${props.caseData[0]?.Compañia}`}
              name="Compañia"
              value={editFormInput.Compañia}
              onChange={handleOnChange}
            />
            <br />
            <Form.Label className="tableTestModalLabel">Nombre Completo: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Nombre Completo: ${props.caseData[0]?.Nombre}`}
              name="Nombre"
              value={editFormInput.Nombre}
              onChange={handleOnChange}
            />
            <br />
            <Form.Label className="tableTestModalLabel">Patente: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Patente: ${props.caseData[0]?.Patente}`}
              name="Patente"
              value={editFormInput.Patente}
              onChange={handleOnChange}
            />
            <br />
            <Form.Label className="tableTestModalLabel">Marca: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Marca: ${props.caseData[0]?.Marca}`}
              name="Marca"
              value={editFormInput.Marca}
              onChange={handleOnChange}
            />
            <br />
            <Form.Label className="tableTestModalLabel">Dirección: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Dirección: ${props.caseData[0]?.direccion}`}
              name="direccion"
              value={editFormInput.direccion}
              onChange={handleOnChange}
            />
            <br />
            <Form.Label className="tableTestModalLabel">Localidad: </Form.Label>
            <Select
            onChange={handleSelect}
            name={"localidad"}
            options={location}
            placeholder="Seleccione una localidad"
            styles={customStyles1}
            defaultValue={{ label:caseData?.localidad, value:caseData?.localidad }}
          />
            <br />
            <Form.Label className="tableTestModalLabel">Teléfono: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Teléfono: ${props.caseData[0]?.celular}`}
              name="celular"
              value={editFormInput.celular}
              onChange={handleOnChange}
            />
            <br />
            <Form.Label className="tableTestModalLabel">Estado: </Form.Label>
            <Select
                onChange={handleSelect}
                name={"estado"}
                options={stateCase}
                placeholder="Estado"
                styles={customStyles1}
                hideSelectedOptions={true}
                defaultValue={{ label:caseData?.estado, value:caseData?.estado }}
              />
            <br />
            <Form.Label className="tableTestModalLabel">Perito encargado: </Form.Label>
            <Select
            onChange={handleSelect}
            name={"peritos"}
            options={namePeritos}
            defaultValue={{ label:caseData?.perito, value:caseData?.perito }}
            // placeholder="Seleccione un perito"
            styles={customStyles1}
          />
            <br />
            <Form.Label className="tableTestModalLabel">Notas: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Notas: ${props.caseData[0]?.notas}`}
              name="notas"
              value={editFormInput.notas}
              onChange={handleOnChange}
            />
            <br />
            <Form.Label className="tableTestModalLabel">Taller: </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Repuestos/Taller: ${props.caseData[0]?.taller}`}
              name="taller"
              value={editFormInput.taller}
              onChange={handleOnChange}
            />
            <br />

            <Button
              variant="secondary"
              className="closeBtn"
              onClick={props.close}
            >
              Cerrar
            </Button>
            {/* <Button variant="success" className="submitBtn" type="submit">
              Guardar
            </Button> */}
            <AddModals  
            body={body}
            agreeBotton={handleSubmit}
            nameBottom={"Confirmar"}
            title={"Si la información es correcta, guarde los cambios"}
            type={"submit"}
            titleBotton={"Guardar"}
            // style={style}
            />
          </Form>
        </Modal.Body>
      </Modal>

      {/* alert after submit */}
        <NotificationContainer/>  
      
    </>
  );
};
export default TableTestModal;
