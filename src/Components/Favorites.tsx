import React from 'react';
import styles from '../css/favorite.module.css'
import { Link } from 'react-router-dom';
type FavType = {
    totalCards: number
}
const Favorites = ({totalCards}: FavType) => {
    const favArr = []
    for(let i = 0; i < totalCards; i += 1){
        // favArr.push(JSON.parse(localStorage.getItem(`item${i}`) || ''))
        favArr.push(localStorage.getItem(`item${i}`))
    }
    console.log('fav', favArr)
    return(
        <div>
            <h1>Favorites</h1>
            <Link to='/'><button className={styles.backBtn}>Back</button></Link>
        </div>
    )
}

export default Favorites;