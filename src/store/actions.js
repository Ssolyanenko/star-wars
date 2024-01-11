import {enhancedFetch} from "../services/Http";

export const BASE_API_URL = `https://swapi.dev/api`;

 const retrieveList = async (array) => {
    let dataList = [];
    for (let url of array) {
        dataList = [...dataList, await enhancedFetch(url)]
    }
    return dataList
}
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




