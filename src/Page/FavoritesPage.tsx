import React, {useState} from 'react';
import styles from '../css/favorite.module.css';
import {Link} from 'react-router-dom';
import Pagination from '../Components/Pagination';
import {CardType} from '../utils/type';
import Card from '../Components/Card';

const Favorites = () => {
	const [pagination, setPagination] = useState({
		current: 1,
		perPage: 5,
	});
	const cardArray: CardType[] = [];
	const lastIndex = pagination.current * pagination.perPage;
	const firstIndex = lastIndex - pagination.perPage;

	for (let i = 0; i < sessionStorage.length; i++) {
		const item = sessionStorage.getItem(sessionStorage.key(i) || '');
		const parseItem = JSON.parse(item || '');
		if (parseItem) {
			cardArray[i] = parseItem;
		}
	}

	console.log(cardArray);

	const handlePagination = (data:{
		current: number,
		perPage: number
	}) => {
		setPagination({
			...pagination,
			...data,
			current: data.current,
			perPage: data.perPage,
		});
	};

	const curPage = cardArray.slice(firstIndex, lastIndex);

	function deleteCard(index: number) {
		const key = sessionStorage.key(index);
		sessionStorage.removeItem(key || '');
		window.location.reload();
	}

	return (
		<div>
			<h1>Favorites</h1>
			<Link to="/"><button className={styles.backBtn}>Back</button></Link>
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
				{curPage.length === 0 && <div className={styles.massage}>There are currently no surviving repositories</div> }
				<div></div>
			</div>
			<Pagination totalCards={cardArray.length} paginate={handlePagination} perPage={pagination.perPage} currentPage={pagination.current}/>
		</div>
	);
};

export default Favorites;
