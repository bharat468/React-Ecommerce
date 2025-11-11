import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import instance from '../config/axiosConfig'
import { useCart } from '../contexts/CartProvider';

const SingleProduct = () => {
  const { id } = useParams();
  const { cart, setCart } = useCart();
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    getSingleData(id);
    console.log(id);
  }, [id]);

  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cart));
  }, [cart]);

  async function getSingleData(id) {
    setLoading(true);
    const response = await instance.get("/product/product/" + id);
    setSingleProduct(response.data);
    setLoading(false);
  }

  if (loading) return <h1 className="text-center text-xl font-semibold py-10 text-gray-600">Loading...</h1>;

  function handleAddToCart(idToAdd) {
    setCart([...cart, { id: idToAdd, quantity: 1 }]);
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-10">
      
      {/* Left Section - Image */}
      <div className="lg:w-1/2 w-full flex justify-center items-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <div className="w-[320px] h-[320px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={singleProduct.image}
            alt={singleProduct.name}
            className="object-contain max-h-[260px] max-w-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Right Section - Details */}
      <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{singleProduct.name}</h1>
          <span className="text-2xl font-semibold text-[#111]">₹{singleProduct.price}</span>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-base leading-relaxed">{singleProduct.description}</p>
        </div>

        {/* <div className="flex items-center gap-4 mb-7">
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="10" r="7" stroke="#555" strokeWidth="2" /></svg>
          </span>
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="w-5 h-5"><rect x="3" y="6" width="14" height="8" rx="4" stroke="#555" strokeWidth="2" /></svg>
          </span>
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="w-5 h-5"><path d="M5 9.5C5 7.567 6.567 6 8.5 6s3.5 1.567 3.5 3.5S10.433 13 8.5 13 5 11.433 5 9.5Z" stroke="#555" strokeWidth="2" /></svg>
          </span>
        </div> */}

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-5">
          {/* <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-1">
            <button className="text-2xl font-semibold px-2 text-gray-500 hover:text-gray-700 focus:outline-none">-</button>
            <span className="px-3 text-lg font-medium text-gray-800">1</span>
            <button className="text-2xl font-semibold px-2 text-gray-500 hover:text-gray-700 focus:outline-none">+</button>
          </div> */}

          <button
            onClick={() => handleAddToCart(singleProduct._id)}
            className="bg-[#111] text-white px-10 py-3 font-semibold rounded-lg transition-all duration-300 hover:bg-[#222] hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
