/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useState} from 'react';
import styles from '../css/card.module.css';
import star from '../images/star.svg';
import markCheck from '../images/markChecked.svg';
import watchersImg from '../images/watchers.svg';
import mark from '../images/markBook.svg';

type CardInfo = {
    name: string,
    language: string,
    description: string,
    clone_url: string,
    watchers: string,
    stargazers_count: number,
    index: number,
    handle: () => void,
    id: number,
}

const Card
   = ({name,
   	language,
   	description,
   	clone_url,
   	watchers,
   	stargazers_count,
   	index,
   	handle,
   	id}: CardInfo) => {
   	const arr = [false, false, false, false];
   	const [, setFalg] = useState(arr);

   	function handleFlag() {
   		handle();
   		setFalg((arr: boolean[]) => arr.map((bool: boolean, i: number) => (Boolean(index === i))));
   	}

   	return (
   		<div className={styles.cardWrap}>
   			<div className={styles.headerWrap}>
   				<div className={styles.name}>
   					<div><h2>{name}</h2></div>
   					<div className={styles.lang}> <h4>{language}</h4></div>
   				</div>
   				<div onClick={handleFlag} className={styles.mark}>
   					<img src={ sessionStorage.getItem('repoIds')?.includes(String(id)) ? markCheck : mark} alt="" />
   				</div>
   			</div>
   			<div className={styles.descrWrap}>
   				<div><p className={styles.description}>{description ? description : 'no more description'}</p></div>
   				<div className={styles.itemWrap}>
				   <div className={styles.item}>
					   <img className={styles.imgStar} src={star} alt="" />
					   <p>{stargazers_count}</p>
				   </div>
   				  <div className={styles.item}>
					   <img src={watchersImg} alt="" />
					   <p>{watchers}</p>
				  </div>
   				</div>
   			</div>
			   <div className={styles.footerWrap}>
   				<div className={styles.link}>
   					<a className={styles.l} href={clone_url}>{clone_url}</a>
   				</div>
   			</div>
   		</div>
   	);
   };

export default Card;
