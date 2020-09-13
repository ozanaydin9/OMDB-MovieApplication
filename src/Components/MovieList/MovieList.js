import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectMovies, selectMoviesAreLoading, selectTotalResults, selectErrorMessage, selectPage, selectTitle} from "../../Redux/Accessors/Accessors";
import {getMovies, getPage, getTitle} from "../../Redux/Actions/Actions";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.css';
import {Selectbox} from "../Selectbox/Selectbox";

const MovieList = () => {

    const dispatch = useDispatch();
    const movies = useSelector(selectMovies);
    const isLoading = useSelector(selectMoviesAreLoading);
    const errorMessage = useSelector(selectErrorMessage);
    const totalResults = useSelector(selectTotalResults);
    const pageGlobal = useSelector(selectPage);
    const titleGlobal = useSelector(selectTitle);

    const [y, setY] = useState([]);
    const [type, setType] = useState([]);

    useEffect(() => {
        dispatch(getMovies(titleGlobal, y, pageGlobal, type))
    }, [pageGlobal]);

    function handleGetMovies() {
        dispatch(getMovies(titleGlobal, y, 1, type))

    }

    function handlePaginationNumberClick(e) {
        dispatch(getPage(Number(e.target.id)))
    }

    function handlePaginationNumberClickInc() {
        if(pageGlobal<pageNumbers.length){
            dispatch(getPage(pageGlobal+1))
        }
    }

    function handlePaginationNumberClickDecr() {
        if(pageGlobal>1){
            dispatch(getPage(pageGlobal-1))
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
            <a key={number} id={number} onClick={handlePaginationNumberClick} className={(pageGlobal === Number(number) ? styles.active : '')}>
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
        <div>
            <div>
                <div className={styles.searchArea}>
                    <textarea placeholder={"Title"} value={titleGlobal} className={styles.textarea} onKeyDown={onEnterPress} onChange={(e) => {dispatch(getTitle(e.target.value))}}></textarea>
                    <input type="number" style={{paddingTop: 0, border: "1px solid rgb(169, 169, 169)"}} placeholder={"Year"} className={styles.textarea} onKeyDown={onEnterPress} onChange={(e) => setY(e.target.value)}></input>
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