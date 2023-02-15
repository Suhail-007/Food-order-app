import React, { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import ModalContext from './context/modal-context';
import CartProvider from './context/cart-provider';

function App() {
  const [isCartVisible, setisCartVisible] = useState(false);

  const toggleCartHandler = (e) => {
    if (e.target.closest('[data-close-Btn]') || e.target.matches('#backdrop')) return setisCartVisible(false);

    // isCartVisible ? setisCartVisible(false) : setisCartVisible(true);
    setisCartVisible(true);
  }

  return (
    <CartProvider>
      <ModalContext.Provider
        value={
         {
          toggleModal: toggleCartHandler
         }}>
        {isCartVisible && <Cart toggleCartModal={toggleCartHandler} />}
        <Header onShowCart={toggleCartHandler} />
        <main>
          <Meals />
        </main>
      </ModalContext.Provider>
    </CartProvider>
    
  );
}

export default App;