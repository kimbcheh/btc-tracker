import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

// Not using an env because no authentication is required for API
// TODO: Implement other currencies `https://api.coinbase.com/v2/prices/spot?currency=${chosenCurrency || USD}` - will this work? Default will be USD
// TODO: Implement an error state
// TODO: Implement a chart (Angus suggested Plotly)
// TODO: Maybe implement useReducer() for the loading/error and for price/time states?
// TODO: Convert time data ISO format to normal date format
// TODO: UI - Implement a loading spinner/animation

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [priceData, setPriceData] = useState()
  const [timeData, setTimeData] = useState()

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
            'https://api.coinbase.com/v2/prices/spot?currency=USD'
          )
        }
        const timePromise = () => {
          return axios.get('https://api.coinbase.com/v2/time')
        }
        await Promise.all([pricePromise(), timePromise()]).then((response) => {
          setPriceData(response[0].data.data.amount)
          setTimeData(response[1].data.data.iso)
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
  }, [])

  return (
    <div>
      <h1>BTC Tracker</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <p>{priceData}</p>
          <p>as at {timeData}</p>
        </div>
      )}
    </div>
  )
}

export default App
