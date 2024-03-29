import React from 'react'
import { useLocation } from "react-router-dom";
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
import LogoEagle from '../../assets/BN.png';
function FooterV2() {
    const { pathname } = useLocation();
    
    if (pathname === "/user") return null;

  return (
    <CDBFooter className="shadow">
    <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
      <CDBBox display="flex" justifyContent="between" className="flex-wrap">
        <CDBBox>
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            <img alt="logo" src={LogoEagle} width="30px" />
            <span className="ml-3 h5 font-weight-bold">Aguila</span>
          </a>
          <p className="my-3" style={{ width: '250px' }}>
            Somos un grupo de profesionales dedicados a dar el mejor servicio de peritaje del país. 
          </p>
          {/* <CDBBox display="flex" className="mt-4">
            <CDBBtn flat color="dark">
              <CDBIcon fab icon="facebook-f" />
            </CDBBtn>
            <CDBBtn flat color="dark" className="mx-3">
              <CDBIcon fab icon="twitter" />
            </CDBBtn> 
            <CDBBtn flat color="dark" className="p-2">
              <CDBIcon fab icon="instagram" />
            </CDBBtn>
          </CDBBox> */}
        </CDBBox>
        <CDBBox>
          <p className="h5 mb-4" style={{ fontWeight: '600' }}> 
            Aguila
          </p>
          <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
            <CDBFooterLink href="/">Home</CDBFooterLink>
            <CDBFooterLink href="/contacto">Contacto</CDBFooterLink>
            <CDBFooterLink href="/">Opiniones</CDBFooterLink>
          </CDBBox>
        </CDBBox>
        <CDBBox>
          <p className="h5 mb-4" style={{ fontWeight: '600' }}>
            Ayuda
          </p>
          <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
            <CDBFooterLink href="/">Support</CDBFooterLink>
            <CDBFooterLink href="/">Sign Up</CDBFooterLink>
            <CDBFooterLink href="/">Sign In</CDBFooterLink>
          </CDBBox>
        </CDBBox>
        <CDBBox>
          <p className="h5 mb-4" style={{ fontWeight: '600' }}>
            Servicios
          </p>
          <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
            <CDBFooterLink href="/">Windframe</CDBFooterLink>
            <CDBFooterLink href="/">Loop</CDBFooterLink>
            <CDBFooterLink href="/">Contrast</CDBFooterLink>
          </CDBBox>
        </CDBBox>
      </CDBBox>
      <small className="text-center mt-5">&copy; Aguila, 2022. All rights reserved.</small>
    </CDBBox>
  </CDBFooter>
  )
}

export default FooterV2