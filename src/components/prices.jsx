import React from 'react';
import PropTypes from 'prop-types';

function Prices(props) {

  const {
    sellPrice, buyPrice, amount,
  } = props;

  return (
    <div className="price">
      <ul className="price-item">
        <li className="price-title">Sell Price</li>
        <li className="price-value">{sellPrice}</li>
      </ul>
      <ul className="price-item">
        <li className="price-title">Buy Price</li>
        <li className="price-value">{buyPrice}</li>
      </ul>
      <ul className="price-item">
        <li className="price-title">Amount</li>
        <li className="price-value">{amount}</li>
      </ul>
    </div>
  )
}

Prices.propTypes = {
  sellPrice: PropTypes.string.isRequired,
  buyPrice: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
} 

export default Prices;
