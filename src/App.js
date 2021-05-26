import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Price from './components/Price'

// Not using an env because no authentication is required for API
// TODO: Implement other currencies `https://api.coinbase.com/v2/prices/spot?currency=${chosenCurrency || USD}` - will this work? Default will be USD
// TODO: Implement an error to show if no data
// TODO: Implement refresh every minute
// TODO: Implement a chart (Angus suggested Plotly)
// TODO: Maybe implement useReducer() for the states?
// I think the app tries to run before data has loaded - Implement a loading state?

function App() {
  const [priceData, setPriceData] = useState()
  const [timeData, setTimeData] = useState()

  useEffect(() => {
    console.log('initialising interval')
    const interval = setInterval(() => {
      fetchPriceData()
      fetchTimeData()
    }, 60000)

    // To fetch BTC spot price data
    const fetchPriceData = async () => {
      try {
        const response = await axios.get(
          'https://api.coinbase.com/v2/prices/spot?currency=USD'
        )
        console.log(response.data.data)
        setPriceData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPriceData()

    // To fetch time at API server
    const fetchTimeData = async () => {
      try {
        const response = await axios.get('https://api.coinbase.com/v2/time')
        console.log(response.data.data.iso)
        setTimeData(response.data.data.iso)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTimeData()

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <h1>BTC Tracker</h1>
      {/* <p>{priceData.amount}</p>
      <p>as of {timeData}</p> */}
      <Price />
    </div>
  )
}

export default App
