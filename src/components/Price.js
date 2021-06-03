function Price({ displayPrice, displayTime, displaySymbol }) {
  return (
    <div>
      <p>
        <h2 className="display-1">
          {displaySymbol}
          {displayPrice}
        </h2>
      </p>
      <p className="text-secondary">as at {displayTime}</p>
    </div>
  )
}

export default Price
