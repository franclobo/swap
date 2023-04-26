import React from 'react'
import PropTypes from 'prop-types'

function Tokens(props) {

  const {
    img, symbol,
  } = props;


  return (
    <div className="token-item">
      <li className="token-img"><img src={img} alt="logo" /></li>
      <li className="token-symbol">{symbol}</li>
    </div>
  )
}

Tokens.propTypes = {
  img: PropTypes.string,
  symbol: PropTypes.string.isRequired,
}

Tokens.defaultProps = {
  img: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
}

export default Tokens
