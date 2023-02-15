import styles from './Checkout.module.css';
console.log(styles);
const Checkout = function(props) {
  return (
    <form className={styles.form}>
      <div className={styles.control}>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' />
      </div>
      <div className={styles.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' />
      </div>
      <div className={styles.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' />
      </div>
      <div className={styles.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' />
      </div>
      
      <div className={styles.actions}>
        <button data-close-btn type='button'>Cancel</button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>

  )
}

export default Checkout;