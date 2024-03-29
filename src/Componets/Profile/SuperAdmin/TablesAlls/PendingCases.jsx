import React from 'react';
import { useSelector } from 'react-redux';
import TableResponsive from '../../../tableTest/TableTest';
import {columns} from '../colums2'

function PendingCases({rol}) {
    const cases2 = useSelector(state=>state.cases)
    // console.log('cases1 pendientes', cases1);
    const peritosByName = useSelector(state=>state.peritosByName)
     
    const cases= cases2.filter(el=>el.estado!=='Pericia finalizada')
    // console.log('cases pendientes==>', cases1);
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
    return (

          <TableResponsive cases={cases} peritos={peritosByName} title={'PERICIAS PENDIENTES'} columns={columns} rol={rol} />
     
    )
}

export default PendingCases