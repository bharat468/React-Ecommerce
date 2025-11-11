import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartProvider'
import instance from '../config/axiosConfig'

export default function Cart() {
  const { cart } = useCart()
  const [cartItem, setCartItem] = useState([])

  useEffect(() => {
    getCartProducts(cart)
  }, [cart])

  async function getCartProducts(cart) {
    const promiss = cart.map((obj) => {
      return instance.get("/product/product/" + obj.id)
    })
    let temp = await Promise.all(promiss)
    setCartItem(temp.map((obj) => obj.data))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">🛒 Your Cart</h1>

      {cartItem.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">आपका Cart खाली है 😔</div>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col space-y-6">
          {cartItem.map((obj) => (
            <div
              key={obj._id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Product Info */}
              <div className="flex items-center gap-6 w-full md:w-auto">
                <img
                  src={obj.image}
                  alt={obj.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{obj.name}</h3>
                  <p className="text-lg text-gray-600 mt-1">₹{obj.price}</p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-sm transition-all duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
