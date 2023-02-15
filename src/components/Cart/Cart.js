import { useState, useContext } from 'react'
import Modal from '../UI/Modal';
import CartItem from './CartItem'
import Checkout from './Checkout'
import CartContext from '../../context/cart-context';
import styles from './Cart.module.css';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const ctx = useContext(CartContext);

  const onAddItemHandler = item => {
    ctx.addItem({ ...item, amount: 1 });
  }

  const onRemoveItemHandler = id => {
    ctx.removeItem(id);
  }

  //ctx.items is the array with contains all the cart existing cart items 
  const cartItemList = ctx.items.map(cartItem => <CartItem
      key={cartItem.id}
      name={cartItem.name}
      amount={cartItem.amount}
      price={cartItem.price}
      onAdd={onAddItemHandler.bind(null, cartItem)}
      onRemove={onRemoveItemHandler.bind(null, cartItem.id)}
      />)

  const hasItems = ctx.items.length > 0;
  const totalAmount = `$ ${ctx.totalAmount.toFixed(2)}`

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartItemList}
    </ul>
  );

  // const toggleModal = function(e) {
  //   if (e.target.closest('#closeBtn') || e.target.closest('#backdrop')) props.toggleCartModal();
  // }

  /*return (
    <Modal onClickModal={toggleModal}>
      {cartItems}
    <div className={styles.total}>
      <span>Total Amount </span>
      <span>$ 12.55</span>
    </div>
    <div className={styles.actions}>
      <button id='closeBtn' className={styles['button-alt']}>Close</button>
      <button className={styles.button}>Order</button>
    </div>
    </Modal>
  )*/
  
  const checkoutHandler = function () {
    setIsCheckout(true);
  }

  const actionsBtn = (
    <div className={styles.actions}>
      <button data-close-btn className={styles['button-alt']}>Close</button>
      {hasItems && <button onClick={checkoutHandler} className={styles.button}>Order</button>}
    </div>
  )

  return (
    <Modal>
        {cartItems}
      <div className={styles.total}>
        <span>Total Amount </span>
        <span>{totalAmount}</span>
      </div>
      
      {isCheckout && <Checkout /> }
      {!isCheckout && actionsBtn}
    </Modal>
  )
}

export default Cart;