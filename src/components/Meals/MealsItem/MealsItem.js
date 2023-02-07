import { useContext } from 'react'
import CardContext from '../../../context/cart-context';
import MealsItemForm from './MealItemForm'
import styles from './MealsItem.module.css';


const MealsItem = props => {
  const price = `$ ${props.price.toFixed(2)}`
  const cartCtx = useContext(CardContext);
  
  const addToCartHandler = function(amount) {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount,
      price:props.price
    })
  }

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.desc}</div>
        <div className={styles.price}>{price}</div>
      </div> 
      <div>
        <MealsItemForm onAddToCart={addToCartHandler} />
      </div> 
    </li>
  )
}
export default MealsItem