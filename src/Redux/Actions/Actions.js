const endpoint = 'https://www.omdbapi.com/?apikey=788e5af';

export function getMovies(s, y, page, type) {
    return async (dispatch) => {
        dispatch({
            type: 'GET_MOVIES_STARTED'
        });

        try {
            const res = await fetch(endpoint+"&s="+s+"&y="+y+"&type="+type+'&page='+page);
            const data = await res.json()

            dispatch({
                type: 'GET_MOVIES_SUCCESS',
                payload:  data.Search,
                errorMessage: data.Error,
                totalResults: data.totalResults
            })
        } catch (error) {
            dispatch({
                type: 'GET_MOVIES_FAILED',
                payload: error
            })
        }
    }
}

export function getMovieDetail(i) {
    return async (dispatch) => {
        dispatch({
            type: 'GET_MOVIE_DETAIL_STARTED'
        });

        try {
            const res = await fetch(endpoint+"&i="+i);
            const data = await res.json()

            dispatch({
                type: 'GET_MOVIE_DETAIL_SUCCESS',
                payload: data
            })
        } catch (error) {
            dispatch({
                type: 'GET_MOVIE_DETAIL_FAILED',
                payload: error
            })
        }
    }
}

export function getPage(page) {
    return async (dispatch) => {

        try {
            dispatch({
                type: 'GET_PAGE',
                payload: page
            });

        } catch (error) {
            dispatch({
                type: 'GET_PAGE_FAILED',
                payload: error
            })
        }
    }
}

export function setPage(page) {
    return (dispatch) => {

        try {
            dispatch({
                type: 'SET_PAGE',
                payload: page
            });

        } catch (error) {
            dispatch({
                type: 'SET_PAGE_FAILED',
                payload: error
            })
        }
    }
}