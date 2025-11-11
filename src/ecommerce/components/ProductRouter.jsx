import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../config/axiosConfig';

const ProductRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        isUserLoggedIn()
    }, []);

    async function isUserLoggedIn() {
        const response = await instance.get("/auth/authCheck", {
            withCredentials: true,
        });
        console.log(response)
    }
}

export default ProductRouter
