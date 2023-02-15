import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = function(state, action) {
  let updatedItems

  if (action.type === 'ADD_ITEM') {

    //if item exist get the index
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    //get the item from existing array
    const existingCartItem = state.items[existingItemIndex];

    if (existingCartItem) {
      //overwrite the amount with the exist amount+newly added amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem
    } else updatedItems = state.items.concat(action.item);

    const newTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
    return {
      items: updatedItems,
      totalAmount: newTotalAmount
    }
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingCartItem = state.items[existingItemIndex];
    let updatedTotalAmount = state.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  
  if(action.type === 'RESET') {
    return defaultCartState
  }

  return defaultCartState;
}

const CartProvider = (props) => {
  const [cartItems, dispatchCartState] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = item => {
    dispatchCartState({ type: 'ADD_ITEM', item });
  }

  const removeItemHandler = id => {
    dispatchCartState({ type: 'REMOVE_ITEM', id })
  }
  
  const resetItemHandler = () => {
    dispatchCartState({type: 'RESET'})
  }

  const cartContext = {
    items: cartItems.items,
    totalAmount: cartItems.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    reset: resetItemHandler
  }

  return <CartContext.Provider value = {cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider