import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import '../Modals/addModal.css';

function AddModals({
  details,
  title,
  body, 
  agreeBotton,
  titleBotton,
  nameBottom,
  type,
  style,
}) {
  const [show, setShow] = useState(false);
  
  let bodyA;
  if (body) {
    bodyA = Object.values(body);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleSubmit=functionBottonAgree()
 // console.log('DETAILS==>',details);
  return (
    <>
      <Button variant="primary"  onClick={handleShow} className="addModalConfirmButton">
        {nameBottom}
      </Button>
     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
       
      >
        
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {details && <div >{details}</div>}
            
              {body?.map((el) => {
                return <ol className="orderedList" ><span>{el.split(':')[0]}</span>{el.split(':')[1]}</ol>;
              })}
            
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={(e) => {
                agreeBotton(e);
                handleClose(e);
              }}
              variant="primary"
              type={type}
              
            >
              {titleBotton}
            </Button>
          </Modal.Footer>
       
      </Modal>
    </>
  );
}

// render(<AddModals />);
export default AddModals;
AddModals.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
  details: PropTypes.element,
  title: PropTypes.string.isRequired,
};

AddModals.defaultProps = {
  details: null,
};
