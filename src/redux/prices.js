import qs from 'qs';

const SET_PRICE = 'SET_PRICE';

const initialState = null;

const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRICE:
      return action.payload;
    default:
      return state;
  }
};

export const setPrice = (price) => ({
  type: SET_PRICE,
  payload: price,
});

export const getPrice = (selectedToken, fromAmount) => async (dispatch) => {
  if (!selectedToken.from || !selectedToken.to || !fromAmount) return;

  const amount = Number(fromAmount) * 10 ** selectedToken.from.decimals;

  const params = {
    sellToken: selectedToken.from.address,
    buyToken: selectedToken.to.address,
    sellAmount: amount,
  };

  const headers = { '0x-api-key': 'c24e40fc-02e9-498c-a46a-40a84ab1814c' };

  const response = await fetch(`https://api.0x.org/swap/v1/price?${qs.stringify(params)}`, { headers });

  const swapPriceJSON = await response.json();

  dispatch(setPrice(swapPriceJSON.price));
};

export default priceReducer;
