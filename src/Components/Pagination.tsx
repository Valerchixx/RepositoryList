/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import styles from '../css/pagination.module.css';

type PaginationType = {
    perPage: number,
    totalCards: number,
    paginate: (pageNumber: number) => void,
    currentPage: number
}

function Pagination({perPage, totalCards, paginate, currentPage}: PaginationType){
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalCards / perPage); i+= 1){
        pageNumbers.push(i);
    }

    return(
        <div className={styles.listWrap}>
            <ul className={styles.list}>
                {pageNumbers.map((number, index) =>
                 <li key={number}
                 className={index+1 === currentPage ? `${styles.listItem} ${styles.active}` : styles.listItem} onClick={() => paginate(number)}>{number}</li>)}
            </ul>
        </div>
    )
}

export default Pagination;