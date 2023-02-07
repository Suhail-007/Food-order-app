import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
import styles from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = props => {
  const mealsListItem = DUMMY_MEALS.map(meal => <MealsItem key={meal.id} id={meal.id} name={meal.name} desc={meal.description} price={meal.price} />)

  return (
    <section className={styles.meals}>
      <ul>
        <Card>
          {mealsListItem}
        </Card>
      </ul>
    </section>

  )
}

export default AvailableMeals