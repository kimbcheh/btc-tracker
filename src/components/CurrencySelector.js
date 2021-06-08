import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function CurrencySelector({ selectedCurrency, onClick }) {
  const currencies = [
    { code: 'AUD', symbol: '$' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
  ]

  const clickHandler = (props) => {
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
    </ButtonGroup>
  )
}

export default CurrencySelector
