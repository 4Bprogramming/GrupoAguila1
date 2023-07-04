import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AllCases from "./TablesAlls/AllCases";
import CompletedCases from "./TablesAlls/CompletedCases";
import PendingCases from "./TablesAlls/PendingCases";
import { GrAddCircle, GrProjects, GrTable } from "react-icons/gr";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import './superAdmin.css'
import { getCasesAction, getPeritos, peritosByName } from "../../../Store/Actions";
import { useDispatch } from "react-redux";
import AllPeritos from "./TablesAlls/AllPeritos";

function SuperAdmin() {
  const navigate = useNavigate();
 // console.log('admin general');
  // let dispatch= useDispatch()
  // useEffect(()=>{
  //   dispatch(getPeritos())
  //   dispatch(getCasesAction())
  //   setTimeout(()=>{ 
  //     dispatch(peritosByName())
  //   },2500)
  // },[dispatch])
  const [all, setAll] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [pending, setPending] = useState(false)
  const [allPeritos, setAllPeritos] = useState(false)

  const handleClick = (value) => {
  //  console.log('super admin handleClick -->', value) 

    if (value === 'AddCases') {
      navigate("/addCases")
    }
    if (value === 'AddPerito') {
      navigate("/addPerito")
    }
    if (value === 'allExpertsReport') {
      setAll(!all)
      setCompleted(false)
      setPending(false)
      setAllPeritos(false)

    }
    if (value === 'endedReports') {
      setAll(false)
      setCompleted(!completed)
      setPending(false)
      setAllPeritos(false)

    }
    if (value === 'pendingReports') {
      setAll(false)
      setCompleted(false)
      setAllPeritos(false)
      setPending(!pending)
    }
    if (value === 'peritos') {
      setAll(false)
      setCompleted(false)
      setPending(false)
      setAllPeritos(!allPeritos)
    }
    
  };

  return (
    <>
    <div className="dropDownSuperAdmin">
      <Dropdown as={ButtonGroup}>
        <Button  className="buttonOptionsSuperAdmin">Opciones</Button>
        <Dropdown.Toggle split  className="buttonOptionsSuperAdmin" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item ><div className="addCase" onClick={() => handleClick('AddCases')}><GrAddCircle /> Agregar Casos</div></Dropdown.Item>
          <Dropdown.Item ><div className="addPerito" onClick={() => handleClick('AddPerito')}><GrAddCircle /> Agregar Perito</div></Dropdown.Item>
          <Dropdown.Item ><div className="allReports" onClick={() => handleClick('allExpertsReport')}><GrTable /> Pericias</div></Dropdown.Item>
          <Dropdown.Item ><div className="endedReports" onClick={() => handleClick('endedReports')}><GrTable /> Finalizadas</div></Dropdown.Item>
          <Dropdown.Item ><div className="pendingReports" onClick={() => handleClick('pendingReports')}><GrTable /> Pendientes</div></Dropdown.Item>
          <Dropdown.Item ><div className="pendingReports" onClick={() => handleClick('peritos')}><GrTable /> Peritos</div></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>


      {all &&
        <AllCases rol={'Administrador General'} />
      }
      {completed &&
        <CompletedCases rol={'Administrador General'}/>
      }
      {pending &&
        <PendingCases rol={'Administrador General'}/>
      }
      {allPeritos &&
        <AllPeritos rol={'Administrador General'}/>
      }
      
    </>
  );
}

export default SuperAdmin;