import { useState, useContext } from 'react';
import useFetch from '../../hooks/use-fetch';

import Modal from '../UI/Modal';
import CartItem from './CartItem'
import Checkout from './Checkout'
import CartContext from '../../context/cart-context';
import styles from './Cart.module.css';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState('');

  const ctxCart = useContext(CartContext);
  const { request: sendRequest } = useFetch();

  const onAddItemHandler = item => {
    ctxCart.addItem({ ...item, amount: 1 });
  }

  const onRemoveItemHandler = id => {
    ctxCart.removeItem(id);
  }

  //ctxCart.items is the array with contains all the cart existing cart items 
  const cartItemList = ctxCart.items.map(cartItem => <CartItem
      key={cartItem.id}
      name={cartItem.name}
      amount={cartItem.amount}
      price={cartItem.price}
      onAdd={onAddItemHandler.bind(null, cartItem)}
      onRemove={onRemoveItemHandler.bind(null, cartItem.id)}
      />)

  const hasItems = ctxCart.items.length > 0;
  const totalAmount = `$ ${ctxCart.totalAmount.toFixed(2)}`

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartItemList}
    </ul>
  );

  const checkoutHandler = function() {
    setIsCheckout(true);
  }

  const submitOrderHandler = async function(userData) {
    try {
      setIsSubmitting(true);
      await sendRequest('https://custom-hook-7b5e7-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          userData,
          items: ctxCart.items
        }
      }, '_');

      setIsSubmitting(false);
      setDidSubmit(true);
      ctxCart.reset();
    } catch (err) {
      setIsSubmitting(false);
      setDidSubmit(false)
      setError(err)
    }
  }
  
  const submitting = (<>
    <p>Submitting your order. please do not leave the page </p>
  </>)

  const submitted = (
    <>
      <p>Successfully submitted your order</p>
    </>
  )


  const actionsBtn = (
    <div className={styles.actions}>
      <button data-close-btn className={styles['button-alt']}>Close</button>
      {!isCheckout && hasItems && !isSubmitting && <button onClick={checkoutHandler} className={styles.button}>Order</button>}
    </div>
  )

  const cartItemsList = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount </span>
        <span>{totalAmount}</span>
      </div>
      
      {isCheckout && <Checkout onConfirm={submitOrderHandler} /> }
    </>
  )

  return (
    <Modal>
    {!isSubmitting && !error && !didSubmit && cartItemsList}
    {isSubmitting && !error && !didSubmit && submitting}
    {didSubmit && !error && submitted}
    {error && <p>An error occurred, try again!</p>}
    {actionsBtn}
    </Modal>
  )
}

export default Cart;