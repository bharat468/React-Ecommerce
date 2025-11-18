import React, { createContext, useContext, useReducer } from 'react'

const cartContext = createContext();

const localStorageCart = () => {
  const stored = localStorage.getItem("storedCart")
  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return []
  }
}

const initialstate = {
  cart: localStorageCart(),
  cartItem: localStorageCart(),
}

function cartReducer(state, action) {
  switch (action.type) {
    case "cart":
      return { ...state, cart: action.paylod }
    case "set-cart-item":
      return { ...state, cartItem: action.paylod }
    default:
      return state

  }
}

function CartProvider({ children }) {
  // const [cart, setCart] = useState(
  //   localStorage.getItem("storedCart") !== null
  //     ? JSON.parse(localStorage.getItem("storedCart"))
  //     : []
  // );

  const [state, dispatch] = useReducer(cartReducer, initialstate)

  const setCart = (paylod) => dispatch({ type: 'cart', paylod })
  const setCartItems = (paylod) => dispatch({ type: 'set-cart-item', paylod })



  return (
    <cartContext.Provider value={{ cart: state.cart, setCart, cartItem: state.cartItem, setCartItems }}>
      {children}
    </cartContext.Provider>
  )
}

export function useCart() {
  return useContext(cartContext);
}
export default CartProvider;
