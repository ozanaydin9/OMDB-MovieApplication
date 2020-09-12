import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectMovies, selectMoviesAreLoading, selectTotalResults, selectErrorMessage, selectPage} from "../../Redux/Accessors/Accessors";
import {getMovies} from "../../Redux/Actions/Actions";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.css';
import {Selectbox} from "../Selectbox/Selectbox";

const MovieList = (props) => {

    const dispatch = useDispatch();
    const movies = useSelector(selectMovies);
    const isLoading = useSelector(selectMoviesAreLoading);
    const errorMessage = useSelector(selectErrorMessage);
    const totalResults = useSelector(selectTotalResults);
    const pageGlobal = useSelector(selectPage);
    console.log(pageGlobal)

    const [s, setS] = useState("Pokemon");
    const [y, setY] = useState([]);
    const [page, setPage] = useState(1);
    const [type, setType] = useState([]);

    useEffect(() => {
        dispatch(getMovies(s, y, page, type))
    }, [page]);

    function handleGetMovies() {
        dispatch(getMovies(s, y, page, type))
    }

    function handlePaginationNumberClick(e) {
        setPage(Number(e.target.id))
    }

    function handlePaginationNumberClickInc() {
        if(page<pageNumbers.length){
            setPage(page+1)
        }
    }

    function handlePaginationNumberClickDecr() {
        if(page>1){
            setPage(page-1)
        }
    }

    function onEnterPress (e) {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            handleGetMovies();
        }
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalResults / 10); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <a key={number} id={number} onClick={handlePaginationNumberClick} className={(page === Number(number) ? styles.active : '')}>
                {number}
            </a>
        );
    });

    const typeList = [
        { name: 'Search All', value: '' },
        { name: 'Only movies', value: 'movie' },
        { name: 'Only series', value: 'series' },
        { name: 'Only episodes', value: 'episodes' },
    ];

    function handleTypeChange(event) {
        setType(event.target.value)
    };

    return (
        <div className={styles.movieList}>
            {console.log("MOVIE LIST RENDERED")}
            <div className={styles.movieListContent}>
                <div className={styles.searchArea}>
                    <textarea placeholder={"Title"} value={s} className={styles.textarea} onKeyDown={onEnterPress} onChange={(e) => setS(e.target.value)}></textarea>
                    <textarea placeholder={"Year"} className={styles.textarea} onKeyDown={onEnterPress} onChange={(e) => setY(e.target.value)}></textarea>
                    <Selectbox optionList={typeList} onChange={handleTypeChange}/>
                    <button onClick={handleGetMovies} className={styles.button}>Search</button>
                </div>

                {isLoading ? (<div style={{marginTop:40}}>
                        <div className={styles.loading}>Loading...</div>
                        <div className="spinner-grow spinner-grow-sm text-dark m-2"></div>
                        <div className="spinner-grow spinner-grow-sm text-dark m-2"></div>
                        <div className="spinner-grow spinner-grow-sm text-dark m-2"></div>
                    </div>) :
                        Array.isArray(movies) ?
                            movies.map((t) => (
                                <MovieCard key={t.imdbID} {...t} />
                            ))
                            : <div>error: {errorMessage}</div>
                }
            </div>
            {isLoading ? null :
            Array.isArray(movies) && movies !== [] ?
                <div className={styles.pagination}>
                    <a onClick={handlePaginationNumberClickDecr}>&laquo;</a>
                    {renderPageNumbers}
                    <a onClick={handlePaginationNumberClickInc}>&raquo;</a>
                </div>
                : null
            }

        </div>

    )
};

export default MovieList;