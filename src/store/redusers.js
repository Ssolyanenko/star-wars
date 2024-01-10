const initialState = {
    search: '',
    people: [],
    films: [],
    loading: true,
    error: false,
};

export const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CHARACTER_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_CHARACTER_SUCCESS':
            return { ...state, people: action.payload };
        case 'FETCH_CHARACTER_FAILURE':
            return { ...state, error: true };
        case 'FETCH_FILMS_SUCCESS':
            return { ...state, films: action.payload, loading: false };
        default:
            return state;
    }
};

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return { ...state, search: action.payload };
        case 'SET_CHARACTERS':
            return { ...state, people: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};