
import React, {useState} from 'react';
import markCheck from '../images/markChecked.svg';
import Card from '../Components/Card';
import styles from '../css/cardsPage.module.css';
import {Link} from 'react-router-dom';
import Pagination from '../Components/Pagination';
import {getRepositories} from '../utils/hooks/fetch';
import {CardType} from '../utils/type';

const Cards = () => {
	const [pagination, setPagination] = useState({
		current: 1,
		perPage: 5,
	});
	const [repoIds, setPeroIds] = useState<number[]>([]);
	const {repos} = getRepositories();

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

	const lastIndex = pagination.current * pagination.perPage;
	const firstIndex = lastIndex - pagination.perPage;
	const curPage = repos.slice(firstIndex, lastIndex);

	function handleAddFavorite(id: number, card: CardType) {
		const data = {
			id: card.id,
			name: card.name,
			language: card.language,
			description: card.description,
			clone_url: card.clone_url,
			watchers: card.watchers,
			stargazers_count: card.stargazers_count,
		};
		// Const {name, language, description, clone_url, watchers, stargazers_count} = card;
		if (sessionStorage.getItem(`item${id}`)) {
			sessionStorage.removeItem(`item${id}`);
		} else {
			sessionStorage.setItem(`item${id}`, JSON.stringify(data));
		}

		const existId = repoIds.indexOf(id);
		if (existId !== -1) {
			const newArr = [...repoIds];
			newArr.splice(existId, 1);
			setPeroIds(newArr);
		} else {
			setPeroIds([...repoIds, id]);
		}

		console.log(repoIds);
	}

	return (
		<div>
			<Link to="/favorites"><button type="button" className={styles.favBtn}><img src={markCheck} alt="" /></button></Link>
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
					handle={() => handleAddFavorite(item.id, item)}
					id={item.id}
				/>
			))}
			<Pagination totalCards={repos.length} perPage={pagination.perPage} paginate={handlePagination} currentPage={pagination.current} />
		</div>
	);
};

export default Cards;
