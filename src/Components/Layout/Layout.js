import React from "react";
import styles from './Layout.module.css';
import MovieList from "../MovieList/MovieList";
import MovieDetail from "../MovieDetail/MovieDetail";
import headerLogo from "../../Assets/Images/OMDB.svg"
import {Link, Route, Switch} from 'react-router-dom'

const Layout = () => {

    return(
        <div className={styles.main}>
            <div className={styles.header}>
                <Link to="/">
                    <img className={styles.headerLogo} src={headerLogo}/>
                </Link>
            </div>
            <Switch>
                <Route path="/" exact>
                    <MovieList/>
                </Route>
                <Route path="/moviedetail">
                    <MovieDetail />
                </Route>
            </Switch>

        </div>
    )
};

export default Layout;