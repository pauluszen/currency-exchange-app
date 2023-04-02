import { useState, useEffect } from 'react'
import './App.css'
import Header from './header/Header'
import CurrencyRow from './components/CurrencyRow'

const BASE_CURRENCY = 'UAH'
const API_KEY = '56c3eb3ecbf3cae352f34f55'
const PAIR_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/`
const BASE_URL = `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`
const HEADER_CURRENCIES = ['USD', 'EUR']

function App() {
  const [allOptions, setAllOptions] = useState([])
  const [headerOptions, setHeaderOptions] = useState({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExChangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [activeAmount, setActiveAmount] = useState(true)
  let toAmount, fromAmount

  if (activeAmount) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      const fetchData = async () => {
        try {
          const res = await fetch(`${PAIR_URL}${fromCurrency}/${toCurrency}`)
          const data = await res.json()

          setExChangeRate(data.conversion_rate)
        } catch (error) {
          setError(error.message)
        }
      }
      fetchData()
    }
  }, [toCurrency, fromCurrency])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL)
        const data = await res.json()
        const firstCurrency = Object.keys(data.rates)[1]

        setFromCurrency(data.base_code)
        setToCurrency(firstCurrency)
        setAllOptions(Object.keys(data.rates))

        setExChangeRate(data.rates[firstCurrency])
        for (const [key, value] of Object.entries(data.rates)) {
          if (HEADER_CURRENCIES.includes(key)) {
            setHeaderOptions((prev) => {
              return { ...prev, [key]: value }
            })
          }
        }
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setActiveAmount(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setActiveAmount(false)
  }

  if (error) {
    return <h1>Error: {error}</h1>
  }

  return (
    <div className="App">
      {isLoading ? (
        <h1>is loading...</h1>
      ) : (
        <Header headerOptions={headerOptions} />
      )}
      <div className="currency__rows">
        <CurrencyRow
          allOptions={allOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <CurrencyRow
          allOptions={allOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </div>
    </div>
  )
}

export default App
