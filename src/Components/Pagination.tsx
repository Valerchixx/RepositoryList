/* eslint-disable no-unused-vars */
import React from 'react';
import styles from '../css/pagination.module.css';

type PaginationType = {
    perPage: number,
    totalCards: number,
    paginate: (data: {current: number, perPage: number}) => void,
    currentPage: number
}

function Pagination({perPage, totalCards, paginate, currentPage}: PaginationType) {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalCards / perPage); i += 1) {
		pageNumbers.push(i);
	}

	return (
		<div className={styles.listWrap}>
			<ul className={styles.list}>
				{pageNumbers.map((number, index) =>
					<li key={number}
						className={index + 1 === currentPage ? `${styles.listItem} ${styles.active}` : styles.listItem} onClick={() => paginate({current: number, perPage: 5})}>{number}</li>)}
			</ul>
		</div>
	);
}

export default Pagination;
