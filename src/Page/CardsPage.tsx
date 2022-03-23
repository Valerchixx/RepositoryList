/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from 'react';
import markCheck from '../images/markChecked.svg';
import Card from '../Components/Card';
import styles from '../css/cardsPage.module.css';
import { Link } from 'react-router-dom';
import Pagination from '../Components/Pagination';
import { CardType} from '../utils/type'


type CardsType = {
    boolArray: boolean[],
    repoArr: CardType[]

}
const Cards = ({ boolArray, repoArr }: CardsType) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(5);

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const curPage = repoArr.slice(firstIndex, lastIndex);

    function paginate(pageNumber: number){
        setCurrentPage(pageNumber)

    }

    function addFavorite(id: number, card: CardType){
        const data = {
            id: card.id,
            name: card.name,
            language: card.language,
            description: card.description,
            clone_url: card.clone_url,
            watchers: card.watchers,
            stargazers_count: card.stargazers_count,
        }
        if(sessionStorage.getItem(`item${id}`)){
            sessionStorage.removeItem(`item${id}`);

        }else{
            sessionStorage.setItem(`item${id}`, JSON.stringify(data));
        }

    }

    return(
        <div>
            <Link to='/favorites'><button type='button' className={styles.favBtn}><img src={markCheck} alt="" /></button></Link>
            {curPage.map((item, index) => (
                <Card
                  key={item.id}
                  name={item.name}
                  language={item.language}
                  description={item.description}
                  clone_url={item.clone_url}
                  watchers={item.watchers}
                  stargazers_count={item.stargazers_count}
                  index={index}
                  handle={() => addFavorite(item.id, item)}
                  id={item.id}
                  />
            ))}
            <Pagination totalCards={repoArr.length} perPage={perPage} paginate={paginate} currentPage={currentPage} />
        </div>
    )
}

export default Cards;