import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function CurrencySelector({ selectedCurrency, onClick }) {
  // const symbolReference = {
  //   AUD: '$',
  //   USD: '$',
  //   EUR: '€',
  //   GBP: '£',
  // }

  const currencies = [
    { code: 'AUD', symbol: '$' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
  ]

  const clickHandler = (props) => {
    // let selectedCurrency = props.target.innerText
    // onClick({
    //   code: selectedCurrency,
    //   symbol: symbolReference[selectedCurrency],
    // })
  }

  return (
    <ButtonGroup>
      {currencies.map((currency) => {
        return (
          <Button
            onClick={clickHandler}
            disabled={currency.code === selectedCurrency}
            variant="primary"
          >
            {currency.code}
          </Button>
        )
      })}
      {/* <Button
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
      </Button> */}
    </ButtonGroup>
  )
}

export default CurrencySelector
