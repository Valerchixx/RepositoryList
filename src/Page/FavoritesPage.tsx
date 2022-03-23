import React, { useState } from 'react';
import styles from '../css/favorite.module.css'
import { Link } from 'react-router-dom';
import Pagination from '../Components/Pagination';
import {CardType} from '../utils/type';
import Card from '../Components/Card'

const Favorites = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(5);
    const cardArray: CardType[] = []
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;


    for(let i = 0; i < sessionStorage.length; i++){
        let item = sessionStorage.getItem(sessionStorage.key(i) || '')
        let parseItem = JSON.parse(item || '');
       if(parseItem){
           cardArray[i] = parseItem
       }
    }
    const curPage = cardArray.slice(firstIndex, lastIndex);

    function paginate(pageNumber: number){
        setCurrentPage(pageNumber)
    }
    function deleteCard(index: number){
        let key  = sessionStorage.key(index);
        sessionStorage.removeItem(key || '');
        window.location.reload()
    }
    return(
        <div>
            <h1>Favorites</h1>
            <Link to='/'><button className={styles.backBtn}>Back</button></Link>
            <div>
              {curPage.map((item, i) => (
                  <Card
                   key={item.id}
                   name={item.name}
                   id={item.id}
                   description={item.description}
                   watchers={item.watchers}
                   stargazers_count={item.stargazers_count}
                   clone_url={item.clone_url}
                   language={item.language}
                   index={i}
                   handle={() => deleteCard(i)}
                   />
              ))}
              {curPage.length === 0 &&  <div className={styles.massage}>There are currently no surviving repositories</div> }
              <div></div>
            </div>
            <Pagination totalCards={cardArray.length} paginate={paginate}  perPage={perPage} currentPage={currentPage}/>
        </div>
    )
}

export default Favorites;