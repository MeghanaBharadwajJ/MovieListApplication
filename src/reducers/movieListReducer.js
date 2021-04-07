import movieListConstants from '../helpers/constants'

const initialState = {
    movieList: [],
    errorMsg: "",
    movieTitle: "",
    searchResult: [],
    searchErrorMsg: ""
}

function movieListReducer(state = initialState, action) {
    switch(action.type) {
        case movieListConstants.MOVIE_LIST_SUCCESS :
            return {
                ...state,
                movieList: action.movieList,
                movieTitle: action.movieTitle,
                errorMsg: ""
            }
        case movieListConstants.MOVIE_LIST_FAILURE: 
            return {
                ...state,
                errorMsg: action.errorMsg,
                movieList: []
            }
        case movieListConstants.MOVIE_SEARCH_SUCCESS:
            return {
                ...state,
                searchErrorMsg: "",
                searchResult: action.searchResult
            }
        case movieListConstants.MOVIE_SEARCH_FAILURE:
            return {
                ...state,
                searchResult: [],
                searchErrorMsg: action.searchErrorMsg
            }
        case movieListConstants.MOVIE_SEARCH_RESET:
            return {
                ...state,
                searchResult: [],
                searchErrorMsg: ""
            }
        default : return state
    }
}

export { movieListReducer };