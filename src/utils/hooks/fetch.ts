import {useEffect, useState} from 'react';
import {fillingFlag} from '../fillingFlag';
import {CardType} from '../type';

export function getRepositories() {
	const [repos, setRepos] = useState<CardType[]>([]);
	const [, setFlag] = useState<boolean[]>([]);

	useEffect(() => {
		async function getRes() {
			const res = await fetch('https://api.github.com/search/repositories?q=created:%3E2022-03-13&sort=stars&order=desc');
			const data = await res.json();
			setFlag(fillingFlag(data.items));
			setRepos(data.items);
		}

		getRes();
	}, []);
	return {repos};
}
