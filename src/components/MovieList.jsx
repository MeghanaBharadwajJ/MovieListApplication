import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { movieListAction } from '../actions/movieListAction';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import jsonPage1 from '../json/CONTENTLISTINGPAGE-PAGE1.json';
import backIcon from '../icons/back.png';
import searchIcon from '../icons/search.png';
import '../assets/movieList.css';

function MovieList() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [pageNum, setPageNum] = useState(1);
    const [movies, setMovies] = useState(jsonPage1.page["content-items"].content);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    var moviesArray = movies;

    // Get state of data from Redux
    const { movieList, movieTitle, searchResult, searchErrorMsg } = useSelector(
        state => ({
            movieList: state.movieListReducer.movieList,
            movieTitle: state.movieListReducer.movieTitle,
            searchResult: state.movieListReducer.searchResult,
            searchErrorMsg: state.movieListReducer.searchErrorMsg
        })
    );

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    useEffect(() => {
        if (!isLoading) return;
        fetchData();
    }, [pageNum, isLoading]);

    const fetchData = () => {
        dispatch(movieListAction.getMovieList(pageNum.toString()));
        dispatch(movieListAction.resetSearchState());
        setMovies(movies => [...movies, ...movieList]);
        setIsLoading(false);
    }

    // Check if the scrollbar is at bottom of page and fetch new set of movies from next json file
    const checkScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !isLoading) {
            setPageNum(pageNum => pageNum + 1);
            setIsLoading(true);
        }
    }

    const handleSeach = (e) => { setSearchTerm(e.target.value); }
    const handleBack = () => {
        history.push('/');
        fetchData();
        setSearchTerm("");
    }

    useEffect(() => {
        dispatch(movieListAction.searchMovie(movies, searchTerm));
    },[searchTerm]);

    searchResult.length !== 0 ? moviesArray = searchResult : moviesArray = movies;

    return (
        <div className="container m-auto px-8 bg-black">
            <div className="flex justify-between bg-header-background fixed z-10 w-11/12">
                <div className="flex pt-4">
                    <img src={backIcon} onClick={handleBack} className="w-6 h-6 mt-2 cursor-pointer" alt="back-icon"/>
                    <p className="text-white px-4 text-3xl">{movieTitle === "" ? jsonPage1.page.title : movieTitle}</p>
                </div>
                <div className="flex h-8 m-3 justify-around">
                    <input type="text" value={searchTerm} onChange={handleSeach} placeholder="Search Movie" 
                        className="px-3 text-white bg-black"/>
                    <img src={searchIcon} className="w-6 h-6 cursor-pointer" alt="back-icon"/>
                    {searchErrorMsg !== "" ? <p className="text-white">{searchErrorMsg}</p>: null}
                </div>
            </div>
            <div className="flex flex-wrap -mx-1 lg:-mx-4 pt-24 min-h-screen">
                {moviesArray.map((movie, index) => {
                    return (
                        <div className="w-1/4 px-2 pl-8 pb-8" key={index}>
                            <LazyLoadImage
                                effect="blur"
                                src={"/images/"+movie["poster-image"]} alt={movie["poster-image"]}
                                placeholderSrc={"/images/placeholder_for_missing_posters.png"}
                            />
                            <p className="text-white">{movie.name}</p>
                        </div>
                    )
                })}
            </div>
            {isLoading && 'Please wait. Loading more Movies ...'}
        </div>
    )
}

export { MovieList }