import React, { createContext, useContext, useState } from 'react'

const cartContext = createContext();

function CartProvider({children}) {
  const [cart, setCart] = useState(
    localStorage.getItem("storedCart") !== null
      ? JSON.parse(localStorage.getItem("storedCart"))
      : []
  );

  
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  )
}

export function useCart() {
  return useContext(cartContext);
}
export default CartProvider;

// import React, { createContext, useContext, useState } from 'react'

// const cartContext = createContext();

// function CartProvider({ children }) {
//   const [cart, setCart] = useState(() => {
//     try {
//       const stored = localStorage.getItem("storedCart");
//       if (!stored) return []; // nothing in localStorage
//       const parsed = JSON.parse(stored);
//       return Array.isArray(parsed) ? parsed : []; // ensure it's array
//     } catch (error) {
//       console.error("Invalid JSON in localStorage:", error);
//       return [];
//     }
//   });

//   return (
//     <cartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </cartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(cartContext);
// }

// export default CartProvider;
