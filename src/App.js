import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
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
    <Container className="mt-5">
      <Jumbotron>
        <Container className="text-center">
          <h1>BTC Tracker</h1>
          <Container
            style={{ height: '180px' }}
            className="d-flex align-items-center justify-content-center"
          >
            {isLoading ? (
              <Spinner animation="border" className="text-primary" />
            ) : (
              <div>
                <p>
                  <h2 className="display-1">
                    {currency.symbol}
                    {priceData}
                  </h2>
                </p>
                <p className="text-secondary">as at {timeData}</p>
              </div>
            )}
          </Container>
          <ButtonGroup>
            <Button
              onClick={clickHandler}
              disabled={currency.code === 'AUD'}
              variant="primary"
            >
              AUD
            </Button>
            <Button
              onClick={clickHandler}
              disabled={currency.code === 'USD'}
              variant="primary"
            >
              USD
            </Button>
            <Button
              onClick={clickHandler}
              disabled={currency.code === 'EUR'}
              variant="primary"
            >
              EUR
            </Button>
            <Button
              onClick={clickHandler}
              disabled={currency.code === 'GBP'}
              variant="primary"
            >
              GBP
            </Button>
          </ButtonGroup>
        </Container>
      </Jumbotron>
    </Container>
  )
}

export default App
