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
    // let selectCurrency = props.target.innerText
    // onClick({
    //   code: selectCurrency,
    //   symbol: currency[selectedCurrency],
    // })
    // let newCurrency = currencies.find(({code}) => code === props.target.innerText)

    let newCurrency = currencies.find(
      ({ code }) => code === props.target.innerText
    )

    onClick(newCurrency)
  }

  return (
    <ButtonGroup>
      {currencies.map((currency) => {
        return (
          <Button
            key={currency.code}
            onClick={clickHandler}
            disabled={currency.code === selectedCurrency.code}
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
