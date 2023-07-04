import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateCases } from "../../../../Controller/llamados";

import "../DeleteCase.css";

//Alert notifications
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";


function DeleteCase(props) {
 

  const caseData = props.caseData[0];

  //========== HANDLE SUBMIT =======
 
  async function handleSubmit(e) {
    e.preventDefault();

    caseData.bandera = "true";
  //  console.log('ELIMINANDO CON BANDERA=>',caseData);
    try {
      await updateCases(props.caseData[0].id, caseData);
     
      //it closes the Modal after submit
      props.close();

      //this commando triggers the alert!
      NotificationManager.success("Bien Hecho!", "Campo eliminado!", 3000);
      //actualiza el estado con el cambio
      props.actualizar();

      props.close();

    } catch (error) {
      console.log(e);
    }
  }

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header closeButton onHide={props.close}>
          <Modal.Title>
            <div className="deleteCaseTitle">
              <span>Atención</span> está por <span>eliminar</span> el caso. {" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="deleteCaseDiv"><span>Número de denuncia: </span>{props.caseData[0]?.Numero}</div>
            <div className="deleteCaseDiv"><span>Nombre: </span>{props.caseData[0]?.Nombre}</div>
            <div className="deleteCaseDiv"><span>Patente: </span>{props.caseData[0]?.Patente}</div>
            <div className="deleteCaseDiv"><span>Marca: </span>{props.caseData[0]?.Marca}</div>
            <div className="deleteCaseDiv"><span>Perito: </span>{props.caseData[0]?.perito}</div>

            <Button
              variant="secondary"
              className="closeButtonDeleteCase"
              onClick={props.close}
            >
              Cerrar
            </Button>

            <Button
              variant="primary"
              className="submitButtonDeleteCase"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Confirmar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* alert after submit */}
      <NotificationContainer />
    </>
  );
}

export default DeleteCase;
