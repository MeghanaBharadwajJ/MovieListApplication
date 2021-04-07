import movieListConstants from '../helpers/constants';
import { movieListServices } from '../services/movieListServices';
import jsonPage1 from '../json/CONTENTLISTINGPAGE-PAGE1.json';
import jsonPage2 from '../json/CONTENTLISTINGPAGE-PAGE2.json';
import jsonPage3 from '../json/CONTENTLISTINGPAGE-PAGE3.json';

function getMovieList(pageNum) {
    switch(pageNum) {
        case jsonPage1.page["page-num-requested"]:
            return(dispatch => {
                callService(dispatch, jsonPage1)
            })
        case jsonPage2.page["page-num-requested"]:
            return(dispatch => {
                callService(dispatch, jsonPage2)
            })
        case jsonPage3.page["page-num-requested"]:
            return(dispatch => {
                callService(dispatch, jsonPage3)
            })
        default:
            return(dispatch => {
                callService(dispatch, jsonPage1)
            })
    }

    function callService(dispatch, jsonData) {
        movieListServices.getMovieList(jsonData)
        .then(response => {
            dispatch(success(response));
        })
        .catch(err => {
            dispatch(failure(err));
        })
    }

    function success(movieList) {
        return {
            type: movieListConstants.MOVIE_LIST_SUCCESS,
            movieList: movieList["content-items"].content,
            movieTitle: movieList.title,
            errorMsg: ""
        }
    }

    function failure(errorMsg) {
        return {
            type: movieListConstants.MOVIE_LIST_SUCCESS,
            movieList: [],
            errorMsg: errorMsg
        }
    }
}

function searchMovie(movieList, searchValue) {
    return dispatch => {
        movieListServices.searchMovie(movieList, searchValue)
        .then(response => {
            dispatch(success(response));
        })
        .catch(err => {
            dispatch(failure(err));
        })
    }

    function success(searchResult) {
        return {
            type: movieListConstants.MOVIE_SEARCH_SUCCESS,
            searchResult: searchResult,
            searchErrorMsg: ""
        }
    }

    function failure(errorMsg) {
        return {
            type: movieListConstants.MOVIE_SEARCH_FAILURE,
            searchResult: [],
            searchErrorMsg: errorMsg
        }
    }
}

function resetSearchState() {
    return dispatch => {
        dispatch(reset())
    }

    function reset () {
        return {
            type: movieListConstants.MOVIE_SEARCH_RESET,
            searchResult: [],
            searchErrorMsg: ""
        }
    }
}

export const movieListAction = {
    getMovieList,
    searchMovie,
    resetSearchState
};