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

// Estado inicial de filtros/UX (par a la web Next)
const initialSearch = {
    busqueda: '',
    ciudad: '',
    categoria: '',
    lblCategoria: '',
};

const initialUx = {
    idComercio: 0,
    scroll: 5,
    limLisEmpresas: 18,
};

function searchReducer(state = initialSearch, action) {
    switch (action.type) {
        case 'SET_SEARCH': {
            const clean = Object.fromEntries(
                Object.entries(action.search || {}).filter(([_, v]) => v !== undefined && v !== null)
            );
            return { ...state, ...clean };
        }
        default:
            return state;
    }
}

function uxReducer(state = initialUx, action) {
    switch (action.type) {
        case 'SET_UX':
            return { ...state, ...(action.ux || {}) };
        default:
            return state;
    }
}

function uiFilterReducer(state = { filterModalVisible: false }, action) {
    switch (action.type) {
        case 'OPEN_FILTER_MODAL':
            return { filterModalVisible: true };
        case 'CLOSE_FILTER_MODAL':
            return { filterModalVisible: false };
        default:
            return state;
    }
}

let rootReducer = combineReducers({
    usuario: usuarioReducer,  // usuario logueado en el sistema
    navigationMako: navigationMakoReducer,
    search: searchReducer,
    ux: uxReducer,
    uiFilter: uiFilterReducer,
    catalog: (state = { listaMunicipios: [], listaMunicipiosFetchedAt: null, listaCategorias: [], listaCategoriasFetchedAt: null }, action) => {
        switch (action.type) {
            case 'SET_LISTA_MUNICIPIOS':
                return {
                    ...state,
                    listaMunicipios: Array.isArray(action.lista) ? action.lista : [],
                    listaMunicipiosFetchedAt: action.ts || Date.now(),
                };
            case 'CLEAR_LISTA_MUNICIPIOS':
                return { ...state, listaMunicipios: [], listaMunicipiosFetchedAt: null };
            case 'SET_LISTA_MUNICIPIOS_FETCHED_AT':
                return { ...state, listaMunicipiosFetchedAt: action.ts };
            case 'SET_LISTA_CATEGORIAS':
                return {
                    ...state,
                    listaCategorias: Array.isArray(action.lista) ? action.lista : [],
                    listaCategoriasFetchedAt: action.ts || Date.now(),
                };
            case 'CLEAR_LISTA_CATEGORIAS':
                return { ...state, listaCategorias: [], listaCategoriasFetchedAt: null };
            default:
                return state;
        }
    },
});


export default createStore(rootReducer)
