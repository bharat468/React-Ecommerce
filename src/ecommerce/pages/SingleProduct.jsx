import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import instance from '../config/axiosConfig'
import { useCart } from '../contexts/CartProvider';
import { useCurrency } from '../contexts/CurrencyProvider';

const SingleProduct = () => {
  const { id } = useParams();
  const { cart, setCart } = useCart();
  const { convert, currency } = useCurrency()
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSingleData(id);
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

  if (loading)
    return (
      <h1 className="text-center text-xl font-semibold py-10 text-gray-600">Loading...</h1>
    );

  function handleAddToCart(pruductAdd) {
    setCart([...cart, pruductAdd]);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#faf7fc] to-[#f3f0f7] flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 font-[Poppins]">

      {/* LEFT SECTION - IMAGE */}
      <div className="lg:w-1/2 w-full flex justify-center items-center p-10">
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">

          {/* Glow Effect */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#C63E21]/20 blur-3xl rounded-full"></div>

          {/* Image */}
          <img
            src={singleProduct.image}
            alt={singleProduct.name}
            className="relative z-10 object-contain h-[330px] w-[330px] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* RIGHT SECTION - DETAILS */}
      <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center">

        {/* Title + Price */}
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1f3340] tracking-wide">
            {singleProduct.name}
          </h1>

          <span className="text-3xl font-semibold text-[#C63E21] drop-shadow-md">
            {currency} {convert(singleProduct.price).toFixed(2)}
          </span>

          <div className="w-20 h-[3px] bg-[#C63E21] mt-3 rounded-full"></div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed bg-white/60 backdrop-blur-xl border border-white/40 p-5 rounded-xl shadow-md">
          {singleProduct.description}
        </p>

        {/* Add to Cart Button */}
        <div className="mt-8">
          <button
            onClick={() => handleAddToCart(singleProduct)}
            className="px-14 py-4 rounded-xl bg-[#C63E21] text-white font-semibold text-lg
            shadow-md hover:shadow-xl hover:-translate-y-1
            transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default SingleProduct;
