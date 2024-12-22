import React, { useState } from 'react'
import '../css/currency.css'
import { FaArrowCircleRight } from "react-icons/fa";
import axios from 'axios';


let BASE_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest'
let API_KEY = '4171093b71e74e21a0fad8a9f2a97edd'
let currencies = ["EUR", "GBP", "MXN", "CAD", "PKR", "BITCOIN", "TRY"]

function Currency() {

    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('EUR')
    const [result, setResult] = useState()

    const exchange = async () => {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base=${fromCurrency}`)
        const result = (response.data.rates[toCurrency] * amount).toFixed(2)
        setResult(result)
    }

    return (
        <div className='main'>
            <h2 className='title'>Currency converter</h2>
            
            <div className='currency'>
                <input 
                    type="number" 
                    className='amount' 
                    value={amount}
                    onChange={(event)=>setAmount(event.target.value)}
                />

                <select className='from-currency' onChange={(event)=>setFromCurrency(event.target.value)}>
                    <option>USD</option>
                    { 
                        currencies.map((currency, index) => (
                            <option key={index}>{currency}</option>
                        ))
                    }
                </select>

                <FaArrowCircleRight style={{ color:'red', fontSize:'2vw'}}/>

                <select className='to-currency' onChange={(event)=>setToCurrency(event.target.value)}>
                    { 
                        currencies.map((currency, index) => (
                            <option key={index}>{currency}</option>
                        ))
                    }
                    <option>USD</option>
                </select>

                <input 
                    type="number" 
                    className='result'
                    value={result}
                    onChange={(event)=>setResult(event.target.value)}
                />
            </div>

            <div>
                <button onClick={exchange}>Convert</button>
            </div>
        
        </div>
    )
}

export default Currency