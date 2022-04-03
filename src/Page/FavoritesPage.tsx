import React, {useMemo, useState} from 'react';
import styles from '../css/favorite.module.css';
import {Link} from 'react-router-dom';
import Pagination from '../Components/Pagination';
import Card from '../Components/Card';
import {calcIndex} from '../utils/hooks/calculateIndex';
import {getFavoriteItem} from '../utils/hooks/localStorage';
import {getRepositories} from '../utils/hooks/fetch';

const Favorites = () => {
	const [pagination, setPagination] = useState({
		current: 1,
		perPage: 5,
	});
	const cardArray: any[] = [];
	const [favRepos] = useState<number[]>(getFavoriteItem('repoIds'));
	const lastIndex = useMemo(() => calcIndex(pagination.current, pagination.perPage), [pagination.current, pagination.perPage]);
	const firstIndex = useMemo(() => calcIndex(pagination.current, pagination.perPage) - pagination.perPage, [pagination.current, pagination.perPage]);
	const {repos} = getRepositories();
	const idsArr = sessionStorage.getItem('repoIds');
	let parseArr;
	if (idsArr !== null) {
		parseArr = JSON.parse(idsArr || '');
	} else {
		parseArr = [];
	}

	for (let i = 0; i < repos.length; i++) {
		const repoItem = repos.length > 1 ? repos[i].id : '';
		const repo = repos.length > 0 ? repos[i] : '';
		for (let j = 0; j < parseArr.length; j++) {
			if (repoItem === parseArr[j]) {
				cardArray[j] = repo;
			} else {
				continue;
			}
		}
	}

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

	function deleteCard(id: number) {
		const exId = favRepos.indexOf(id);
		if (exId !== -1) {
			favRepos.splice(exId, 1);
		}

		sessionStorage.setItem('repoIds', JSON.stringify(favRepos));
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
						handle={() => deleteCard(item.id)}
					/>
				))}
				{!curPage.length && <div className={styles.massage}>There are currently no surviving repositories</div> }
				<div></div>
			</div>
			<Pagination totalCards={cardArray.length} paginate={handlePagination} perPage={pagination.perPage} currentPage={pagination.current}/>
		</div>
	);
};

export default Favorites;
