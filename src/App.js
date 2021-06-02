import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

dayjs().format()

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [priceData, setPriceData] = useState()
  const [timeData, setTimeData] = useState()
  const [currency, setCurrency] = useState({ code: 'AUD', symbol: '$' })

  const symbolReference = {
    AUD: '$',
    USD: '$',
    EUR: '€',
    GBP: '£',
  }

  useEffect(() => {
    // Set to loading again on each refresh
    setIsLoading(true)

    // Initialising interval of 60 seconds
    const interval = setInterval(() => {
      fetchData()
    }, 60000)

    // Fetch price and time data
    const fetchData = async () => {
      try {
        const pricePromise = () => {
          return axios.get(
            `https://api.coinbase.com/v2/prices/BTC-${currency.code}/spot`
          )
        }
        const timePromise = () => {
          return axios.get(process.env.REACT_APP_API_TIME_URL)
        }
        await Promise.all([pricePromise(), timePromise()]).then((response) => {
          setPriceData(Math.round(response[0].data.data.amount * 100) / 100)
          let formattedTime = dayjs(response[1].data.data.iso).format(
            'dddd MMMM D YYYY, h:mm:ss A'
          )
          setTimeData(formattedTime)
          setIsLoading(false)
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()

    // Clear interval set
    return () => {
      clearInterval(interval)
    }
  }, [currency])

  // Handler for buttons to set currency and currencySymbol state
  const clickHandler = (props) => {
    let selectedCurrency = props.target.innerText
    setCurrency({
      code: selectedCurrency,
      symbol: symbolReference[selectedCurrency],
    })
  }

  return (
    <div>
      <h1>BTC Tracker</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <p>
            {currency.symbol}
            {priceData}
          </p>
          <p>as at {timeData}</p>
        </div>
      )}
      <div>
        <button onClick={clickHandler} disabled={currency.code === 'AUD'}>
          AUD
        </button>
        <button onClick={clickHandler} disabled={currency.code === 'USD'}>
          USD
        </button>
        <button onClick={clickHandler} disabled={currency.code === 'EUR'}>
          EUR
        </button>
        <button onClick={clickHandler} disabled={currency.code === 'GBP'}>
          GBP
        </button>
      </div>
    </div>
  )
}

export default App
