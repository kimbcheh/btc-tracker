function Price({ price, time, symbol }) {
  return (
    <div>
      <p>
        <h2 className="display-1">
          {symbol}
          {price}
        </h2>
      </p>
      <p className="text-secondary">as at {time}</p>
    </div>
  )
}

export default Price
