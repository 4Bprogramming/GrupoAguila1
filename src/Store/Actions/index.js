import axios from "axios";
import { getPer, getCases } from "../../Controller/llamados";

import {
  GET_PERITOS,
  POST_WHATSAPP,
  GET_CASES,
  SEARCH_CASE,
  SEARCH_PERITO,
  GET_PERITOBYNAME,
  DETAIL_CASE,
  DETAIL_PERITO,
  LOADING_CASE,
  POST_CASE,
  POST_PERITO,
} from "../utils/constantes";
const url=process.env.REACT_APP_DATABASE_URL
export function getPeritos() {
 // console.log('/////////entra a action getPeritos url==>/////////', process.env.REACT_APP_DATABASE_URL);
  return async function (dispatch) {
 //   console.log('/////////entra a DISPATCH action getPeritos/////////');
    
  const data= await axios.get(`${url}/peritos`)
 // console.log('informacion que trae==>', data)
  
    return dispatch({
      type: GET_PERITOS,
      payload: data.data,
    });
  };
}
export function getCasesAction() {
  return async function (dispatch) {
    const data= await axios.get(`${url}/casos`)
    return dispatch({
      type: GET_CASES,
      payload: data.data,
    });
  };
}
export const searchCase = (payload) => {
  return {
    type: SEARCH_CASE,
    payload,
  };
};
export const SearchPeritos = (payload) => {
  return {
    type: SEARCH_PERITO,
    payload,
  };
};
export function peritosByName() {
  return {
    type: GET_PERITOBYNAME,
  };
}

export function postWhatsapp(body) {
  return async function (dispatch) {
    try {
    //  console.log('mando wsp');
      var json = await axios.post(
        "https://api.ultramsg.com/instance23751/messages/chat",
        body
      );
    //  console.log('respuesta json wsp==>', json);
 
      return dispatch({
        type: POST_WHATSAPP,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getritos = () => {};
export const gPeritos = () => {};
export const geritos = () => {};
export const gritos = () => {};
export const gitos = () => {};
