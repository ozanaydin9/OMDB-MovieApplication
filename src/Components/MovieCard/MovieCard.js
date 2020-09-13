import React from "react";
import styles from './MovieCard.module.css';
import {Link} from "react-router-dom";
import imgNotFound from "../../Assets/Images/imgnotfound.png";
const MovieCard = ({Title, Year, imdbID, Poster}) => {

    return(
        <div className={styles.moviecard} title={Title}>
            <Link to={{pathname:"/moviedetail", state:{id:imdbID}}} >
                <div className={styles.cardImageArea}>
                    <img className={styles.cardImage} src={Poster==="N/A" ? imgNotFound : Poster}/>
                </div>
                <div><hr className={styles.horizontalLine}/></div>
                <div className={styles.cardDetailArea}>
                    <p className={styles.cardimdb}> IMDB {imdbID} </p>
                    <p className={styles.carddate}> {Year} </p>
                </div>
                <div><hr className={styles.horizontalLine} style={{height:3}}/></div>
                <div className={styles.cardname}>{Title}</div>
            </Link>
        </div>
    )
};

export default MovieCard;