import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const currencyContext = createContext()

function CurrencyProvider({ children }) {

    const [currency, setCurrency] = useState("INR")
    const [rates, setRates] = useState({ INR: 1, USD: 1, EUR: 1 })

    useEffect(() => {
        fecthApi()
    }, [])

    async function fecthApi() {
        let response = await axios.get("https://v6.exchangerate-api.com/v6/6bce15e32f31a92ad98adf9d/latest/INR")

        setRates({
            INR: 1,
            USD: response.data.conversion_rates.USD,
            EUR: response.data.conversion_rates.EUR,
        });
    }

    function convert(priceInINR) {
        return priceInINR * rates[currency];
    }

    return (
        <currencyContext.Provider value={{ currency, setCurrency, convert, rates }}>
            {children}
        </currencyContext.Provider>
    )
}

export function useCurrency() {
    return useContext(currencyContext)
}

export default CurrencyProvider
