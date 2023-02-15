import { useState } from 'react';
import styles from './Checkout.module.css';

const validation = function(obj) {
  let isNameValid, isStreetValid, isPostalCodeValid, isCityValid;

  for (let key in obj) {
    if (key === 'name') {
      isNameValid = obj[key].trim() !== ''
    }
    if (key === 'street') {
      isStreetValid = obj[key].trim() !== ''
    }
    if (key === 'postal') {
      isPostalCodeValid = obj[key].trim().length === 6
    }
    if (key === 'city') {
      isCityValid = obj[key].trim() !== ''
    }
  }

  return {
    isNameValid,
    isStreetValid,
    isPostalCodeValid,
    isCityValid
  }
}

const Checkout = function(props) {
  const [isInputsValid, setIsInputsValid] = useState({
    isNameValid: true,
    isStreetValid: true,
    isPostalCodeValid: true,
    isCityValid: true,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const fd = [...new FormData(e.target)];
    const fdObj = Object.fromEntries(fd);
    setIsInputsValid(validation(fdObj));

    const { isNameValid, isStreetValid, isPostalCodeValid, isCityValid } = isInputsValid;

    let isFormValid = isNameValid && isStreetValid && isPostalCodeValid && isCityValid;

    if (!isFormValid) return
  }

  const addInvalidClass = isInputValid => {
    return isInputValid && `${styles.invalid}`
  }


  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={`${styles.control} ${addInvalidClass(!isInputsValid.isNameValid)}`}>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name'  name='name' />
        
        {!isInputsValid.isNameValid && <p>Please enter valid name!</p>}
      </div>
      <div className={`${styles.control} ${addInvalidClass(!isInputsValid.isStreetValid)}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'  name='street' />
        {!isInputsValid.isStreetValid && <p>Please enter valid Street name!</p>}
      </div>
      <div className={`${styles.control} ${addInvalidClass(!isInputsValid.isPostalCodeValid)}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' name='postal' />
        
        {!isInputsValid.isPostalCodeValid && <p>Please enter valid postal code!</p>}
      </div>
      <div className={`${styles.control} ${addInvalidClass(!isInputsValid.isCityValid)}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' name='city' />
        
        {!isInputsValid.isCityValid && <p>Please enter valid city name!</p>}
      </div>
      
      <div className={styles.actions}>
        <button data-close-btn type='button'>Cancel</button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>

  )
}

export default Checkout;