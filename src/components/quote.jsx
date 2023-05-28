import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuote } from '../redux/quotes.js';

function Quote({ selectedToken }) {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.quotes.quote);

  useEffect(() => {
    dispatch(getQuote(selectedToken)).then(() => {
      console.log("Quote fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching quote:", error);
    });
  }, [selectedToken, dispatch]);

  return quote.amountOut !== undefined ? quote.amountOut : '';
}

export default Quote;
