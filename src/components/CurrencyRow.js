function CurrencyRow(props) {
  const {
    allOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props

  return (
    <div className="currency__row">
      <input
        type="number"
        className="input"
        value={amount ? amount : ''}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {allOptions.map((currency, index) => {
          return (
            <option value={currency} key={index}>
              {currency}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default CurrencyRow
