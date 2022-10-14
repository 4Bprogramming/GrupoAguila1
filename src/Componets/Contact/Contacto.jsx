import React from 'react'
import './Contacto.css'

function Contacto() {
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
                  <input type="text" className="formulario" name="company" id="company"  placeholder="Nombre de empresa" />
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
                  <input type="submit" value="Send Message" className="btn btn-primary rounded-0 py-2 px-4" />
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
            <p className="mb-5">Somor ¡Grupo Águila! expertos en Pericias y damos soluciones en el menor tiempo posible</p>
            <ul className="list-unstyled">
              <li className="d-flex">
                <span className="wrap-icon icon-room mr-3"></span>
                <span className="text">Estamos en Calle mendoza y entre ríos  625</span>
              </li>
              <li className="d-flex">
                <span className="wrap-icon icon-phone mr-3"></span>
                <span className="text">+54 999999999999</span>
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
