import React from 'react';
import { useSelector } from 'react-redux';
import TableResponsive from '../../../tableTest/TableTest';
import {columns} from '../colums2'

function CompletedCases({rol}) {
    const cases1 = useSelector(state=>state.cases)
    const peritosByName = useSelector(state=>state.peritosByName)
    

    const cases= cases1.filter(el=>el.estado==='Pericia finalizada')
    /* console.log('casesCompleted', cases);
    console.log('cases', cases1); */
     
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
      <div>
          <TableResponsive cases={cases} peritos={peritosByName} title={'PERICIAS FINALIZADAS'} columns={columns} rol={rol} />
      </div>
  )
}

export default CompletedCases