import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
          return axios.get(process.env.REACT_APP_API_PRICE_URL)
        }
        const timePromise = () => {
          return axios.get(process.env.REACT_APP_API_TIME_URL)
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
