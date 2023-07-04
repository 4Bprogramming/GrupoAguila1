import React from 'react';
import { useSelector } from 'react-redux';
import TableResponsive from '../../../tableTest/TableTest';
import {columns} from '../colums2'


function AllCases({rol}) {
    const cases = useSelector(state=>state.cases)
    
   // console.log('cases', cases)
    
    cases.sort((a,b)=>{
      const dayA=a.Vencimiento.split("-")
      const dayB=b.Vencimiento.split("-")
      const VencimientoA= new Date(`${dayA[1]}/${dayA[0]}/${dayA[2]}`)
      const VencimientoB= new Date(`${dayB[1]}/${dayB[0]}/${dayB[2]}`)
      if(VencimientoA<VencimientoB){
        return -1;
      }
      if(VencimientoA>VencimientoB){
        return 1
      }
      return 0;

    })
  const peritosByName = useSelector(state=>state.peritosByName)
  return (
    <div>
        <TableResponsive cases={cases} peritos={peritosByName} title={'TODAS LAS PERICIAS'} columns={columns} rol={rol}/>
    </div>
  )
}

export default AllCases