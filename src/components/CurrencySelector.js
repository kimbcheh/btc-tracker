import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function CurrencySelect({ currency, handleCurrency }) {
  const symbolReference = {
    AUD: '$',
    USD: '$',
    EUR: '€',
    GBP: '£',
  }

  const clickHandler = (props) => {
    let selectedCurrency = props.target.innerText
    handleCurrency({
      code: selectedCurrency,
      symbol: symbolReference[selectedCurrency],
    })
  }

  return (
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
  )
}

export default CurrencySelect
