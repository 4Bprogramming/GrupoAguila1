import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { deletePerito, updatePeritos } from "../../../Controller/llamados";
import "./DeletePerito.css";

//Alert notifications
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function DeletePerito(props) {


  let peritos = useSelector((state) => state.peritos);

  const caseData = props.caseData[0];

  const [editFormInput, setEditFormInput] = useState({});
  
  useEffect(() => {
    setEditFormInput({
      nombre: caseData?.nombre,
      email: caseData?.email,
      celular: caseData?.celular,
      rol: caseData?.rol,
    });
  }, [props]);

  //========== HANDLE SUBMIT =======

  async function handleSubmit(e) {
    e.preventDefault();
   // console.log("idPerito", props.caseData[0].id);

    try {

      let edit = await deletePerito(props.caseData[0].id);
     // console.log('respuesta edit ==>', edit);

      props.close();

      //this commando triggers the alert!
      NotificationManager.success("Bien Hecho!", "Perito eliminado!", 3000);
      //actualiza el estado con el cambio
      props.actualizar();

    } catch (error) {
      console.log("error de catch", error);
    }
  }

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
            <div className="deletPerito">
              <span>Atención</span> está por <span>eliminar</span> el perito. {" "}
            </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
       
            <div className="deletePeritoDiv"><span>Nombre Completo: </span>{props.caseData[0]?.nombre}</div>
            <div className="deletePeritoDiv"><span>Email: </span>{props.caseData[0]?.email}</div>
            <div className="deletePeritoDiv"><span>Teléfono: </span>{props.caseData[0]?.celular}</div>

            <Button
              variant="secondary"
              className="closeButtonDeletePerito"
              onClick={props.close}
            >
              Cerrar
            </Button>
            <Button variant="success" className="supportButtonDeletePerito" type="submit">
              Eliminar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* alert after submit */}
      <NotificationContainer />
    </>
  );
}

export default DeletePerito;
