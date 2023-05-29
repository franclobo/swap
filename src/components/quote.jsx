import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuote } from '../redux/quotes.js';

function Quote({ selectedToken }) {
  const dispatch = useDispatch();
  const sellTokenAddress = useSelector((state) => state.quotes.sellTokenAddress);

  useEffect(() => {
    dispatch(getQuote(selectedToken)).then(() => {
      console.log("Quote fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching quote:", error);
    });
  }, [selectedToken, dispatch]);

  return (
    <span className="quote">
      {sellTokenAddress !== undefined ? sellTokenAddress : ''}
    </span>
  );
}

export default Quote;
