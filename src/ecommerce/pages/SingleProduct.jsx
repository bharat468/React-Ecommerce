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

  function handleAddToCart(pruductAdd) {
    setCart([...cart, pruductAdd]);
  }

  console.log(cart)

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
          <span className="text-2xl font-semibold text-[#111]">{currency} {convert(singleProduct.price).toFixed(2)}</span>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-base leading-relaxed">{singleProduct.description}</p>
        </div>


        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-5">


          <button
            onClick={() => handleAddToCart(singleProduct)}
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
