import React from 'react';
import HeaderCardButton from './HeaderCartButton'
import styles from './Header.module.css';
import headerImg from '../../assets/meals.jpg';

export default function Header(props) {
  // return (
  //   <>
  //   <header className={styles.header}>
  //     <h1>React Meals </h1>
  //     <HeaderCardButton onClick={props.onShowCart}/>
  //   </header>
    
  //   <div className={styles['main-image']} >
  //     <img src={headerImg} alt='table full of delicious food'/>
  //   </div>
  //   </>
  // )
  return (
    <>
    <header className={styles.header}>
      <h1>React Meals </h1>
      <HeaderCardButton />
    </header>
    
    <div className={styles['main-image']} >
      <img src={headerImg} alt='table full of delicious food'/>
    </div>
    </>
  )
}