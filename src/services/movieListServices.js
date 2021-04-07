function getMovieList(movieList) {
    return new Promise((resolve, reject) => {
        if(movieList.page["content-items"].content.length > 0) {
            resolve(movieList.page)
        } else {
            reject("No data");
        }
    })
}

function searchMovie(movieList, searchValue) {
    let searchResults = [];
    return new Promise((resolve, reject) => {
        movieList.filter(movie => movie.name.toLowerCase().includes(searchValue.toLowerCase())).map(filteredArray => {
            searchResults.push(filteredArray)
        });

        if (searchResults.length > 0) {
            resolve(searchResults)
        } else {
            reject(searchValue + " movie not found");
        }
    })
}

export const movieListServices = { 
    getMovieList,
    searchMovie
};