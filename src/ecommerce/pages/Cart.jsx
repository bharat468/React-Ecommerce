import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartProvider'
import instance from '../config/axiosConfig'

export default function Cart() {
  const { cart } = useCart()
  const [cartItem, setCartItem] = useState(
    localStorage.getItem("storedCart") !== null
      ? JSON.parse(localStorage.getItem("storedCart"))
      : []
  )

  useEffect(() => {
    getCartProducts(cart)
  }, [cart])

  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cartItem));
  }, [cartItem]);

  async function getCartProducts(cart) {
    const promises = cart.map((obj) => instance.get("/product/product/" + obj.id))
    let temp = await Promise.all(promises)
    setCartItem(temp.map((obj) => ({ ...obj.data, quantity: 1 })))
  }

  function quantityPlus(id) {
    const updateQuantity = cartItem.map((obj) => {
      if (obj._id === id) {
        return { ...obj, quantity: obj.quantity + 1 }
      }
      return obj
    })
    setCartItem(updateQuantity)
  }

  function quantityLess(id) {
    const updateQuantity = cartItem.map((obj) => {
      if (obj._id === id) {
        return { ...obj, quantity: obj.quantity > 1 ? obj.quantity - 1 : 1 }
      }
      return obj
    })
    setCartItem(updateQuantity)
  }

  function handleRemove(id) {
   
setCartItem(cartItem.filter((obj)=>{
    return obj._id!==id
  }))
}


return (
  <div className="min-h-screen bg-gray-50 py-10 px-6">
    <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
      🛒 Your Cart
    </h1>

    {cartItem.length === 0 ? (
      <div className="text-center text-gray-500 text-lg mt-10">
        Sorry :- आपका Cart खाली है 😔
      </div>
    ) : (
      <div className="max-w-5xl mx-auto flex flex-col space-y-6">
        {cartItem.map((obj) => (
          <div
            key={obj._id}
            className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            {/* Remove icon (UI only). Add onClick={() => remove(itemId)} when you implement remove logic */}
            <button
              type="button"
              aria-label="Remove item"
              title="Remove item"
              className="absolute right-4 top-4 flex items-center justify-center w-9 h-9 rounded-full hover:bg-red-50 transition"
              onClick={() => handleRemove(obj._id)}
            >
              {/* Trash SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>

            {/* Product Info */}
            <div className="flex items-center gap-6 w-full md:w-1/2">
              <img
                src={obj.image}
                alt={obj.name}
                className="w-28 h-28 object-cover rounded-lg shadow-sm border border-gray-100"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{obj.name}</h3>
                <p className="text-lg text-gray-600 mt-1">₹{obj.price}</p>
                <p className="text-sm text-green-600 mt-1 font-medium">No Discount</p>
              </div>
            </div>

            {/* Quantity, Discount & Total */}
            <div className="flex flex-col md:flex-row items-center justify-end gap-8 w-full md:w-1/2">
              {/* Quantity Section */}
              <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-2 shadow-inner">
                <button
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                  onClick={() => quantityLess(obj._id)}
                >
                  −
                </button>
                <span className="text-lg font-semibold text-gray-800">{obj.quantity}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                  onClick={() => quantityPlus(obj._id)}
                >
                  +
                </button>
              </div>

              {/* Discount Section */}
              <div className="text-center md:text-left">
                <p className="text-gray-500 text-sm">Discount</p>
                <p className="text-green-600 font-semibold">₹0</p>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-xl font-bold text-gray-800">₹{obj.price * obj.quantity}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Grand Total Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8 border border-gray-100 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-gray-700 text-lg font-medium">Total ( {cartItem.length} items )</div>
          <div className="text-2xl font-bold text-gray-800 mt-2 sm:mt-0">
            ₹{cartItem.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
          </div>
        </div>
      </div>
    )}
  </div>
)
}
