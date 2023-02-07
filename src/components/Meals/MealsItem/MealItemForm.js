import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import styles from './MealItemForm.module.css';

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputAmountRef = useRef();
  const id = new Date().getTime().toString();

  const submitHandler = function(e) {
    e.preventDefault();
    const enteredAmount = +inputAmountRef.current.value

    if (enteredAmount <= 0 || enteredAmount > 5) {
      setAmountIsValid(false);
      return
    }

    setAmountIsValid(true)
    props.onAddToCart(enteredAmount);
    //reset value back to 1
    inputAmountRef.current.value = 1;
  }


  return (
    <form onSubmit={submitHandler} className={styles.form}>
    <Input
      label='Amount'
      ref={inputAmountRef}
      input={
      {
        id: id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
      }
    } />
    <button>+Add</button>
    {!amountIsValid && <p>Please enter a value between 0 - 5</p>}
   </form>
  )

}

export default MealItemForm