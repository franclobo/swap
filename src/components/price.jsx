import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrice } from '../redux/prices.js'; // Added setPrice import
import Form from 'react-bootstrap/Form';

function Price({ selectedToken }) {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.prices.price);

  useEffect(() => {
    dispatch(getPrice(selectedToken)).then(() => {
      console.log("Price fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching price:", error);
    });
  }, [selectedToken, dispatch]);

  return (
    <Form.Control type="text" placeholder="0.0000" readOnly value={price || ''} />
  );
}

export default Price;
