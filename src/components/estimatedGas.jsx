import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrice } from '../redux/prices.js';

function EstimatedGas({ selectedToken }) {
  const dispatch = useDispatch();
  const estimatedGas = useSelector((state) => state.prices.estimatedGas);

  useEffect(() => {
    dispatch(getPrice(selectedToken)).then(() => {
      console.log("Price fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching price:", error);
    });
  }, [selectedToken, dispatch]);

  return (
    <span className="estimatedGas">
      {estimatedGas !== undefined ? estimatedGas : ''}
    </span>
  );
}

export default EstimatedGas;
