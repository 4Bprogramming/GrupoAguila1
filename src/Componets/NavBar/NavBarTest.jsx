import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../../Credentials/Index";
import Container from "react-bootstrap/Container";
import Login from "../Login/Login"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";
import "./NavBarTest.css";
const auth = getAuth(firebaseApp);

function NavScrollExample() {
  const navigate = useNavigate();
  const emailUser = JSON.parse(localStorage.getItem("emailUser"));
  function closeSession() {
    signOut(auth);
    localStorage.removeItem("emailUser");
    let path = "/";
    navigate(path);
  }
  return (
    <Navbar className="navBarContainer" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} className="LogoNavBar" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            //navbarScroll
          >
            <div className="listNavBar">
              <div className="navBarLinks">
                <NavLink to="/">Home</NavLink>
              </div>
              <div className="navBarLinks">
                <NavLink to="/nosotros">¿Quiénes Somos?</NavLink>
              </div>
              {/* <div className="navBarLinks">
                <NavLink to="/servicios">Servicios</NavLink>
              </div> */}
              <div className="navBarLinks">
                <NavLink to="/servicios">Servicios</NavLink>
              </div>
              <div className="navBarLinks">
                <NavLink to="/contacto">Contacto</NavLink>
              </div>

              {emailUser ? (
                <>
                  <div className="navBarLinks">
                    <NavLink to="/user">
                      <BsFillPersonCheckFill />
                      <NavLink to="/" onClick={closeSession}>Cerrar sesion</NavLink>
                    </NavLink>
                  </div>

              
                </>
              ) : (
                <div className="navBarLinks">
                  <NavLink to="#">< Login /></NavLink>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
