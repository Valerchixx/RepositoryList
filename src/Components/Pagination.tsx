/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from '../css/pagination.module.css'

type PaginationType = {
    perPage: number,
    totalCards: number,
    paginate: (pageNumber: number) => void
}

function Pagination({perPage, totalCards, paginate}: PaginationType){
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalCards / perPage); i+= 1){
        pageNumbers.push(i)
    }
    return(
        <div className={styles.listWrap}>
            <ul className={styles.list}>
                {pageNumbers.map((number) =>
                 <li className={styles.listItem} onClick={() => paginate(number)}>{number}</li>)}
            </ul>
        </div>
    )
}

export default Pagination;