
import React, {useMemo, useState} from 'react';
import markCheck from '../images/markChecked.svg';
import Card from '../Components/Card';
import styles from '../css/cardsPage.module.css';
import {Link} from 'react-router-dom';
import Pagination from '../Components/Pagination';
import {getRepositories} from '../utils/hooks/fetch';
import {calcIndex} from '../utils/hooks/calculateIndex';
import {getFavoriteItem} from '../utils/hooks/localStorage';
const Cards = () => {
	const [pagination, setPagination] = useState({
		current: 1,
		perPage: 5,
	});
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

	const lastIndex = useMemo(() => calcIndex(pagination.current, pagination.perPage), [pagination.current, pagination.perPage]);
	const firstIndex = useMemo(() => calcIndex(pagination.current, pagination.perPage) - pagination.perPage, [pagination.current, pagination.perPage]);
	const curPage = repos.slice(firstIndex, lastIndex);
	const [repoIds] = useState<number[]>(getFavoriteItem('repoIds'));

	function handleAddFavorite(id: number) {
		const exsistId = repoIds.indexOf(id);
		if (exsistId !== -1) {
			repoIds.splice(exsistId, 1);
			sessionStorage.setItem('repoIds', JSON.stringify(repoIds));
		} else {
			repoIds.push(id);
			sessionStorage.setItem('repoIds', JSON.stringify(repoIds));
		}
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
					handle={() => handleAddFavorite(item.id)}
					id={item.id}
				/>
			))}
			<Pagination totalCards={repos.length} perPage={pagination.perPage} paginate={handlePagination} currentPage={pagination.current} />
		</div>
	);
};

export default Cards;
