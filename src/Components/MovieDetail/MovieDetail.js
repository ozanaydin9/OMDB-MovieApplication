import React, {useEffect, useState} from "react";
import styles from './MovieDetail.module.css';
import {useDispatch, useSelector} from "react-redux";
import {selectMovieDetails, selectMoviesAreLoading} from "../../Redux/Accessors/Accessors";
import {Link, useLocation} from 'react-router-dom'
import {getMovieDetail, getMovies} from "../../Redux/Actions/Actions";
import imgNotFound from "../../Assets/Images/imgnotfound.png";
import backLogo from "../../Assets/Images/back.svg";


const MovieDetail = () => {

    const dispatch = useDispatch();
    const movieDetail = useSelector(selectMovieDetails);
    const isLoading = useSelector(selectMoviesAreLoading);
    const location = useLocation();
    const id = location.state.id;

    useEffect(() => {
        dispatch(getMovieDetail(id))
    }, []);

    return(
        <div className={styles.movieDetail}>
            <Link to="/">
                <div className={`d-none d-sm-block  ${styles.back}`}><img src={backLogo}/></div>
            </Link>
            {isLoading ? ( <div style={{marginTop:40}}>
                                <div className={styles.loading}>Loading...</div>
                                <div className="spinner-grow spinner-grow-sm text-dark m-2"></div>
                                <div className="spinner-grow spinner-grow-sm text-dark m-2"></div>
                                <div className="spinner-grow spinner-grow-sm text-dark m-2"></div>
                            </div>) :
            <div className={`container-fluid`}>
                <div className={`row justify-content-center p-3`}>
                    <div className={styles.movieTitle}>{movieDetail.Title}</div>
                </div>
                <div className={`row`}>
                    <div className={`col-sm-12 col-md-4 col-lg-4 col-12`}>
                        <div>
                            <img className={styles.movieDetailImage} src={movieDetail.Poster==="N/A" ? imgNotFound : movieDetail.Poster}/>
                        </div>
                        <div className={styles.movieDetailLeftBottom}>
                            <div className={styles.movieIMDB}>
                                <span style={{fontWeight:"bold"}}>IMDB Rating - </span>
                                {movieDetail.imdbRating}
                            </div>
                            <div className={styles.movieIMDB}>
                                <span style={{fontWeight:"bold"}}>IMDB Votes - </span>
                                {movieDetail.imdbVotes}
                            </div>
                            <div className={styles.movieIMDB}>
                                <span style={{fontWeight:"bold"}}>BoxOffice - </span>
                                {movieDetail.BoxOffice}
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-12 col-md-8 col-lg-8 col-12`}>
                        <div className={styles.movieDetailRightTop}>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Released - </span>
                                {movieDetail.Released}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Runtime - </span>
                                {movieDetail.Runtime}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Genre - </span>
                                {movieDetail.Genre}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Director - </span>
                               {movieDetail.Director}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Writer - </span>
                                {movieDetail.Writer}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Actors - </span>
                                {movieDetail.Actors}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Language - </span>
                                {movieDetail.Language}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Country - </span>
                                {movieDetail.Country}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Awards - </span>
                                {movieDetail.Awards}
                            </div>
                            <div className={styles.movieInfo}>
                                <span style={{fontWeight:"bold"}}>Plot - </span>
                                {movieDetail.Plot}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
};

export default MovieDetail;