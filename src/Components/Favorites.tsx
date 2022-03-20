import React from 'react';
import styles from '../css/favorite.module.css'
import { Link } from 'react-router-dom';
type FavType = {
    totalCards: number
}
const Favorites = ({totalCards}: FavType) => {
    return(
        <div>
            <h1>Favorites</h1>
            <Link to='/'><button className={styles.backBtn}>Back</button></Link>
        </div>
    )
}

export default Favorites;