import { useContext, useEffect, useState } from 'react';
import ModalContext from '../../context/modal-context';
import CartContext from '../../context/cart-context';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = props => {
  const [isBtnHighlighted, setIsBtnHighlight] = useState(false);
  const modalCtx = useContext(ModalContext);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  const numOfCartItems = items.reduce((currNum, item) => currNum + item.amount, 0);

  const btnClasses = `${styles.button} ${isBtnHighlighted && styles.bump}`

  useEffect(() => {
    if (!items.length) return

    setIsBtnHighlight(true);

   const timer = setTimeout(() => {
      setIsBtnHighlight(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    }
  }, [items])

  return (
    <button type='button' onClick={modalCtx.toggleModal} className={btnClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton