/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from 'react';
import markCheck from '../images/markChecked.svg';
import mark from '../images/markBook.svg';
import star from '../images/star.svg';
import watchers from '../images/watchers.svg';
import styles from '../css/card.module.css';
import { Link } from 'react-router-dom';


type CardsType = {
    cardsArr: any[],
    boolArray: boolean[]
}
const Card = ({cardsArr, boolArray }: CardsType) => {
    const arr = [false, false,false,false,false,false]
    const [flags, setFlags] = useState<boolean[]>(arr)
    function handleFlag(index: number){
        setFlags((arr: boolean[]) => arr.map((bool: boolean, i: number) => (index === i ? !bool : bool) ))
    }
    console.log(flags)
    const valueArr = []
    for(let i = 0; i < cardsArr.length; i +=1){
        if(flags[i]){
            let data = {
                name: cardsArr[i].name,
                id:  cardsArr[i].id
            }
            localStorage.setItem(`item${i}`, JSON.stringify(data))
        }
    }





    return(
        <div>
            <Link to='/favorites'><button type='button' className={styles.favBtn}><img src={markCheck} alt="" /></button></Link>
            {cardsArr.map((item, index) => (
                <div className={styles.cardWrap}>
                    <div className={styles.headerWrap}>
                        <div className={styles.name}>
                            <div><h2>{item.name}</h2></div>
                            <div className={styles.lang}> <h4>{item.language}</h4></div>
                        </div>
                        <div onClick={() => handleFlag(index)} className={styles.mark}>
                            <img src={flags[index] ? markCheck : mark} alt="" />
                        </div>
                    </div>
                    <div className={styles.descrWrap}>
                        <p className={styles.description}>{item.description}</p>
                    </div>
                    <div className={styles.footerWrap}>
                        <div className={styles.link}>
                            <a href={item.clone_url}>{item.clone_url}</a>
                        </div>
                        <div className={styles.info}>
                         <div className={styles.starInfo}>
                           <div className={styles.starImg}> <img src={star} alt="" /> </div>
                           <div> {item.stargazers_count} </div>
                           </div>
                        <div className={styles.watchersInfo}>
                            <div className={styles.watchersImg}><img src={watchers} alt="" /></div>
                            <div>{item.watchers}</div>
                        </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card;