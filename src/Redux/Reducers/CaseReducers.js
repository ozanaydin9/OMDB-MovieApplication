const defaultState = {
    isLoading: null,
    error: null,
    movies: [],
    movieDetail: [],
    errorMessage: [],
    page: []
};

const CaseReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_MOVIES_STARTED':
            return { ...state, isLoading: true};

        case 'GET_MOVIES_SUCCESS':
            return { ...state, isLoading: false, movies: action.payload, totalResults: action.totalResults, errorMessage: action.errorMessage};

        case 'GET_MOVIES_FAILED':
            return { ...state, isLoading: false, movies: action.payload};

        case 'GET_MOVIE_DETAIL_STARTED':
            return { ...state, isLoading: true};

        case 'GET_MOVIE_DETAIL_SUCCESS':
            return { ...state, isLoading: false, movieDetail: action.payload};

        case 'GET_MOVIE_DETAIL_FAILED':
            return { ...state, isLoading: false, movieDetail: action.payload};

        case 'GET_PAGE':
            return { ...state, isLoading: false, page: action.page};

        default:
            return state
    }
};

export default CaseReducers