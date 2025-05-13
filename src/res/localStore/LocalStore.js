import { createStore, combineReducers } from 'redux';


const auxiusuario = {"id":1057577213,"correo":"andres.feego@gmail.com ","nombre":"Oscar Andres ","apellido":"Manrique","pass":"123456", "roles": ["1","5"]}


function usuarioReducer(state = auxiusuario, action) {
    switch (action.type) {
        case 'SET_USUARIO':
            return action.usuario;

        case 'CLEAR_USUARIO':
            return '';


        default:
            return state;
    }
}

function navigationMakoReducer(state = [], action) {
    switch (action.type) {
        case 'SET_NAVIGATIONRED':
            return action.navigationMako;

        case 'CLEAR_NAVIGATIONRED':
            return '';


        default:
            return state;
    }
}

let rootReducer = combineReducers({
    usuario: usuarioReducer,  // usuario logueado en el sistema
    navigationMako: navigationMakoReducer
});


export default createStore(rootReducer)