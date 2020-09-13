const defaultState = {
    isLoading: null,
    error: null,
    movies: [],
    movieDetail: [],
    errorMessage: [],
    page: 1,
    title: "Pokemon"
};

const CaseReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_MOVIES_STARTED':
            return { ...state, isLoading: true};

        case 'GET_MOVIES_SUCCESS':
            return { ...state, isLoading: false, movies: action.payload, totalResults: action.totalResults, errorMessage: action.errorMessage, page: action.pageGlobal};

        case 'GET_MOVIES_FAILED':
            return { ...state, isLoading: false, movies: action.payload};

        case 'GET_MOVIE_DETAIL_STARTED':
            return { ...state, isLoading: true};

        case 'GET_MOVIE_DETAIL_SUCCESS':
            return { ...state, isLoading: false, movieDetail: action.payload};

        case 'GET_MOVIE_DETAIL_FAILED':
            return { ...state, isLoading: false, movieDetail: action.payload};

        case 'GET_PAGE':
            return { ...state, isLoading: false, page: action.payload};

        case 'GET_TITLE':
            return { ...state, isLoading: false, title: action.payload};

        default:
            return state
    }
};

export default CaseReducers