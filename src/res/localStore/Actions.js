export const setUsuario = (auxi) => {
    return {
        type: 'SET_USUARIO',
        usuario: auxi
    }
}

export const clearUsuario = () => {
    return {
        type: 'CLEAR_USUARIO'
    }
}

export const setNavigationRed = (auxi) => {
    return {
        type: 'SET_NAVIGATIONRED',
        navigationMako: auxi
    }
}

export const clearNavigationRed = () => {
    return {
        type: 'CLEAR_NAVIGATIONRED'
    }
}

// Filtros de búsqueda (equivalente a useDataStore en web)
export const setSearch = (partial) => {
    return {
        type: 'SET_SEARCH',
        search: partial,
    }
}

export const setUx = (partial) => {
    return {
        type: 'SET_UX',
        ux: partial,
    }
}

// Visibilidad del modal de filtros (control global)
export const openFilterModal = () => ({ type: 'OPEN_FILTER_MODAL' });
export const closeFilterModal = () => ({ type: 'CLOSE_FILTER_MODAL' });

// Catálogos
export const setListaMunicipios = (lista) => ({ type: 'SET_LISTA_MUNICIPIOS', lista, ts: Date.now() });
export const clearListaMunicipios = () => ({ type: 'CLEAR_LISTA_MUNICIPIOS' });
export const setListaMunicipiosFetchedAt = (ts) => ({ type: 'SET_LISTA_MUNICIPIOS_FETCHED_AT', ts });

// Catálogos: Categorías
export const setListaCategorias = (lista) => ({ type: 'SET_LISTA_CATEGORIAS', lista, ts: Date.now() });
export const clearListaCategorias = () => ({ type: 'CLEAR_LISTA_CATEGORIAS' });
