import {enhancedFetch} from "../services/Http";
import {retrieveList} from "../actions";
export const BASE_API_URL = `https://swapi.dev/api`;

export const fetchCharacter = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_CHARACTER_REQUEST' });

        try {
            const response = await enhancedFetch(BASE_API_URL + `/people/${id}`);
            dispatch({ type: 'FETCH_CHARACTER_SUCCESS', payload: response });

            const dataFilms = await retrieveList(response.films);
            dispatch({ type: 'FETCH_FILMS_SUCCESS', payload: dataFilms });
        } catch (error) {
            dispatch({ type: 'FETCH_CHARACTER_FAILURE' });
        }
    };
};

export const fetchFilm = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_FILM_REQUEST' });

        try {
            const response = await enhancedFetch(BASE_API_URL + `/films/${id}`);
            dispatch({ type: 'FETCH_FILM_SUCCESS', payload: response });

            const dataFilms = await retrieveList(response.films);
            dispatch({ type: 'FETCH_FILMS_SUCCESS', payload: dataFilms });
        } catch (error) {
            dispatch({ type: 'FETCH_FILM_FAILURE' });
        }
    };
};


export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
});

export const setCharacters = (characters) => ({
    type: 'SET_CHARACTERS',
    payload: characters,
});
export const setDispatchFilms = (films) => ({
    type: 'SET_FiLMS',
    payload: films,
});
export const setLoading = (isLoading) => ({
    type: 'SET_LOADING',
    payload: isLoading,
});

export const setError = (hasError) => ({
    type: 'SET_ERROR',
    payload: hasError,
});
