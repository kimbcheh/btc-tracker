import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

function Price({ displayPrice, displayTime, displaySymbol, isLoading }) {
  return (
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
              {displaySymbol}
              {displayPrice}
            </h2>
          </p>
          <p className="text-secondary">as at {displayTime}</p>
        </div>
      )}
    </Container>
  )
}

export default Price
