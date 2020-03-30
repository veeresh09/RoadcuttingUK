import { actions } from "react-table";
import { act } from "@testing-library/react";

const initState = {
    user : "",
    password : "",
    auth_token: "null",
    auth_tokenid:"null",
    formdata:[],
    nam :[],
    consumCode :"null",
    mdmsdata:{},
    lang:0,
}

const rootReducer = (state = initState,action) =>{
    if (action.type ==='EDIT_USERNAME'){
        return{
            ...state,
            user:action.user
        }
    }
    if (action.type ==='EDIT_PASSWORD'){
        return{
            ...state,
            password:action.password
        }
    }
    if(action.type ==='AUTHENTICATE'){
        return{
            ...state,
            auth_token : action.auth_token
        }
    }
    if(action.type ==='AUTHENTICATEID'){
        return{
            ...state,
            auth_tokenid : action.auth_tokenid
        }
    }
    if(action.type ==='COPYFORMDETAILS'){
        return{
            ...state,
            formdata : action.formdata
        }
    }
    if(action.type ==='CITIESLIST'){
        return{
            ...state,
            nam : action.nam
        }
    }
    if(action.type ==='CONSUMCODEEDIT'){
        return{
            ...state,
            consumCode:action.consumCode
        }
    }
    if(action.type ==='DATALOAD'){
        return{
            ...state,
            mdmsdata:action.mdmsdata
        }
    }
    if(action.type ==='CHANGELANG'){
        return{
            ...state,
            lang:action.lang
        }
    }
    
    return state;
}

export default rootReducer