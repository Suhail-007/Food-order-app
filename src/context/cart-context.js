import React from 'react';

const CartContext = React.createContext(() => {
  return {
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {}
  }
})

export default CartContext