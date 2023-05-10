import { useDispatch, useSelector } from 'react-redux';
import { getPrice } from '../redux/prices.js'; // Added setPrice import
import Form from 'react-bootstrap/Form';

function Price() {
  const dispatch = useDispatch();
  const selectedToken = useSelector((state) => state.selectedToken);
  const fromAmount = useSelector((state) => state.fromAmount);
  const price = useSelector((state) => state.prices.price);

  const handleGetPrice = () => {
    dispatch(getPrice(selectedToken, fromAmount)); // Wait for getPrice to finish and get the returned value
  };

  return (
    <Form.Control type="text" placeholder="0.0000" readOnly onChange={handleGetPrice} value={price} />
  );
}

export default Price;
