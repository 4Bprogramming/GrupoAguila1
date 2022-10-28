import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Componets/NavBar/NavBar";
import NavBarTest from "./Componets/NavBar/NavBarTest";
 import Contacto from "./Componets/Contact/Contacto";
 import Home from "./Componets/Home/Home";
import Users from "./Componets/Users/Users";
import Profile from "./Componets/Profile/Profile";
import AddCases from "./Componets/InputsSelects/AddCases/AddCases"; 
import Register from "./Componets/Login/Register";
import AddPeritos from "./Componets/InputsSelects/AddPeritos/AddPeritos";
import TableTest from "./Componets/tableTest/TableTest";
import { PrivateRoute } from "./PrivateRutes";
/* import Login from "./Componets/Login/Login"; */


function App() {
  return (
    <div className="App">
      <NavBarTest />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/user" element={<Users/>} >
       
        </Route>
        <Route
        path="/addPerito"
        element={
          <PrivateRoute >
           <AddPeritos />
          </PrivateRoute>
        }
      />
        <Route
        path="/addCases"
        element={
          <PrivateRoute >
           <AddCases />
          </PrivateRoute>
        }
      />
        <Route path="/register" element={<Register />} />
        <Route path="/contacto" element={<Contacto />} />
        
        
        {/* <Route path="/tabletest" element={<TableTest />} /> */}
      </Routes>
    </div>
  );
} 

export default App;
