import Lenis from 'lenis'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBoxOpen } from 'react-icons/fa6'   // 🛍️ Icon for “Products”
import instance from '../config/axiosConfig'

const First = () => {
  useEffect(() => {
    const lenis = new Lenis()
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      setLoading(true)
      const response = await instance.get('/product/get')
      setProduct(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  function trimContent(input, len) {
    if (typeof input !== 'string') return ''
    return input.length > len ? input.slice(0, len) + '...' : input
  }

  if (loading)
    return (
      <h1 className="text-center mt-20 text-2xl text-[#C63E21] font-[Poppins] font-semibold">
        Loading...
      </h1>
    )

  return (
    <div className="min-h-screen w-full bg-[#F9F7FA] flex flex-col items-center py-10 font-[Poppins]">
      
      {/* 🔹 Heading */}
      <div className="flex items-center gap-3 mb-10">
        <FaBoxOpen className="text-[#C63E21] text-4xl sm:text-5xl" />
        <h2 className="text-4xl sm:text-5xl font-bold text-[#C63E21] relative after:content-[''] after:block after:w-20 after:h-[3px] after:bg-[#C63E21] after:mx-auto after:mt-2">
          Products
        </h2>
      </div>

      {/* 🔹 Product Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 sm:px-10">
        {product.length > 0 &&
          product.map((obj) => (
            <div
              key={obj._id}
              className="shadow-lg bg-[#EEECEF] text-[#003f51] flex flex-col items-center p-8 rounded-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              <Link
                to={`/product/${obj._id}`}
                className="w-full flex justify-center"
              >
                <img
                  src={obj.image}
                  alt={obj.name}
                  className="h-[220px] object-contain mb-6 w-full"
                />
              </Link>

              <h3 className="text-[1.2rem] font-semibold mb-3 text-center w-full">
                <Link
                  to={`/product/${obj._id}`}
                  className="hover:text-[#ff6f00] transition-colors duration-200 text-red-700"
                >
                  {trimContent(obj.name, 18)}
                </Link>
              </h3>

              <p className="text-[1.3rem] font-medium m-0">
                ₹{obj.price}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default First
