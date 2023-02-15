import React from 'react';

const CartContext = React.createContext(() => {
  return {
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {},
    resetItems: () => {}
  }
})

export default CartContext