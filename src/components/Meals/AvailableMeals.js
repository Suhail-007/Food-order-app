import { useState, useEffect } from 'react';
import useFetch from '../../hooks/use-fetch';

import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
import styles from './AvailableMeals.module.css';


const simplifyData = function(obj) {
  let simplifiedObj = {}
  for (let key in obj) {
    simplifiedObj = obj[key]
  }
  return simplifiedObj;
}

const AvailableMeals = props => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { request: getMeals } = useFetch();

  useEffect(() => {
    setIsLoading(true)
    async function temp() {
      try {
        const data = await getMeals('https://custom-hook-7b5e7-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json', '_', simplifyData);
        setIsLoading(false);
        setMeals(data);
      } catch (err) {
        setIsLoading(false)
        setError(err)
      }
    }
    temp();
  }, [getMeals]);
  if (error) {
    return (
      <section className={styles.mealsError}>
      <p>{error}</p>
    </section>
    )
  }

  if (isLoading && !error) {
    return (
      <section className={styles.mealsLoading}>
      <p>Loading...</p>
    </section>
    )
  }

  const mealsListItem = meals.map(meal => <MealsItem key={meal.id} id={meal.id} name={meal.name} desc={meal.description} price={meal.price} />)

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