import React from 'react'
import './Contacto.css'
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

function Contacto() {
  const navigate= useNavigate()

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_d4n8uu8",
        "template_b91p3lr",
        e.target,
        "m161GBw_7jaymvDc3",
        alert("Su mensaje ha sido enviado, pronto te responderemos")
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
      navigate("/");
  }
  return (
    <div>
      <div className="content">
    
    <div className="continer">
      <div className="row align-items-stretch no-gutters contact-wrap">
        <div className="col-md-8">
          <div className="form h-100">
            <h3>Contáctanos</h3>
            <form className="mb-5" method="post" id="contactForm" name="contactForm">
              <div className="row">
                <div className="col-md-6 form-group mb-5">
                  <label for="" className="col-form-label">Nombre *</label>
                  <input type="text"  className="formulario" name="nombre" id="nombre"placeholder="Nombre"/>
                </div>
                <div className="col-md-6 form-group mb-5">
                  <label for="" className="col-form-label">Correo *</label>
                  <input type="text" className="formulario" name="email" id="email"  placeholder="Correo" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group mb-5">
                  <label for="" className="col-form-label">Teléfono</label>
                  <input type="text" className="formulario" name="phone" id="phone"  placeholder="Nro Teléfono" />
                </div>
                <div className="col-md-6 form-group mb-5">
                  <label for="" className="col-form-label">Empresa</label>
                  <input type="text" className="formulario" name="empresa" id="company"  placeholder="Nombre de empresa" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 form-group mb-5">
                  <label for="message" className="col-form-label">Mensaje *</label>
                  <textarea className="formulario" name="message" id="message" cols="30" rows="4"  placeholder="Consulta o Mensaje"></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <input type="submit" value="Enviar" className="btn btn-primary rounded-0 py-2 px-4" />
                  <span className="submitting"></span>
                </div>
              </div>
            </form>

            <div id="form-message-warning mt-4"></div> 
            <div id="form-message-success">
              Mensaje enviado
            </div>

          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-info h-100">
            <h3>Información de Contacto </h3>
            <p className="mb-5">
                  Somos ¡Grupo Águila! una empresa joven, pero con vasta
                  experiencia en el área de Siniestros y resolución de
                  conflictos.
                </p>
                <p >
                  Si tienes alguna duda o sugerencia puedes enviárnosla llenando
                  el formulario.{" "}
                </p>
             <ul className="list-unstyled">
              <li className="d-flex">
                <span className="wrap-icon icon-room mr-3"></span>
                <span className="text">{/* Direccion aca */}</span>
              </li>
              <li className="d-flex">
                <span className="wrap-icon icon-phone mr-3"></span>
                <span className="text">{/* Telefono aca */}</span>
              </li>
              <li className="d-flex">
                <span className="wrap-icon icon-envelope mr-3"></span>
                <span className="text">info@mywebsite.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
    </div>
  )
}

export default Contacto
