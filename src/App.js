import { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import dayjs from 'dayjs'
import Price from './components/Price'
import CurrencySelector from './components/CurrencySelector'
import './App.css'

dayjs().format()

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [priceData, setPriceData] = useState()
  const [timeData, setTimeData] = useState()
  const [currency, setCurrency] = useState({ code: 'AUD', symbol: '$' })

  useEffect(() => {
    // On each refresh update loading on, error off
    setIsLoading(true)
    setHasError(false)

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
        setHasError(true)
        setIsLoading(false)
        console.log(error.response)
      }
    }

    fetchData()

    // Clear interval set
    return () => {
      clearInterval(interval)
    }
  }, [currency])

  // Set currency state from CurrencySelector component
  const onClick = (event) => {
    setCurrency(event)
  }

  return (
    <Container className="container-main">
      <Jumbotron className="jumbotron">
        <h1>BTC Tracker</h1>
        <Container className="container-price">
          {hasError && (
            <Alert variant="danger">Sorry! Something went wrong...</Alert>
          )}
          {isLoading && <Spinner animation="border" className="text-primary" />}
          {!hasError && !isLoading && (
            <Price price={priceData} time={timeData} symbol={currency.symbol} />
          )}
        </Container>
        <CurrencySelector currency={currency} onClick={onClick} />
      </Jumbotron>
    </Container>
  )
}

export default App
