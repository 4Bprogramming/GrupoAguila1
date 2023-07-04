export const day=Array.from({length: 31}, (_, i) => i + 1).map(e=>{return {value:e, label:e}})

export const month=Array.from({length: 12}, (_, i) => i + 1).map(e=>{return {value:e, label:e}})
const hoy = new Date()
const yearNow=hoy.getFullYear() 
const stopYear= yearNow+5
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
export const years= range(yearNow,stopYear,1 ).map(e=>{return {value:e, label:e}})

export const location=['Capital', 'General Alvear', 'Godoy Cruz','Guaymallén','Junín', 'La Paz', 'Las Heras','Lavalle', 'Luján de Cuyo', 'Maipú', 'Malargüe', 'Rivadavia', 'San Carlos', 'San Martín', 'San Rafael', 'Santa Rosa', 'Tunuyán', 'Tupungato','Buenos Aires', 'San Juan', 'San Luis'  ].map(e=>{return {value:e, label:e}})

export const stateCase=['Asignado', 'Próximo a visita', 'En proceso de cotización', 'En proceso de liquidación', 'En proceso de reparación', 'Contacto erróneo', 'Pericia finalizada'].map(e=>{return {value:e, label:e}})
export const rol=[{value:"Administrador junior", label:"Administrador junior"},{value:"Administrador General", label:'Administrador General'},{value:"Tecnico", label:'Tecnico'}]
export const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? '#d32f2f' : 'rgb(62, 117, 219)',
      // padding: 20,
      width:'100%'
    })}
export const customStyles1 = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? '#d32f2f' : 'rgb(62, 117, 219)',
      
      width:'100%'
    })}

