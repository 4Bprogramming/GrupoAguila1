import {
  GET_PERITOS,
  GET_CASES,
  GET_PERITOBYNAME,
  SEARCH_CASE,
  SEARCH_PERITO,
  DETAIL_CASE,
  DETAIL_PERITO,
  LOADING_CASE,
  POST_CASE,
  POST_WHATSAPP,
  POST_PERITO,
} from "../utils/constantes";
import {
  createPer,
  createCase,
  updateCases,
  updatePeritos,
  getPer,
  getCases,
  getCasesByCondition,
  deleteItem,
} from "../../Controller/llamados";
const initialState = {
  cases: [],
  peritos: [],
  peritosByName: [],
  selectOptions: {},
};

let rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERITOS:
    //  console.log('peritos=>', action.payload);
      return {
        ...state,
        peritos: action.payload,
      };
    case GET_CASES:
     // console.log('CASOS=>', action.payload);
      let cases1=action.payload.sort((a,b)=>{
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
      return {
        ...state,
        cases: cases1,
      };
    case GET_PERITOBYNAME:
      const per = [...state.peritos];
      let namePeritos = per.map((el) => {
        return el.nombre;
      });
      return {
        ...state,
        peritosByName: namePeritos,
      };

    default:
      return state;
  }
};

export default rootReducer;
