const url = `https://api.0x.org/swap/v1/prices`;
const GET_PRICES = 'GET_PRICES';

const priceReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRICES:
      return action.prices;
    default:
      return state;
  }
};

const getPrices = (prices) => ({
  type: GET_PRICES,
  prices,
});

export const fetchPrices = () => async (dispatch) => {
  const List = [];
  const response = await fetch(url+`${'?sellToken=ETH&buyToken=DAI'}+${'&sellAmount=1000000000000000000'}`);
  const data = await response.json();
  const { prices } = data;
  Object.keys(prices).forEach((key) => {
    List.push(prices[key]);
  });
  dispatch(getPrices(List));
};

export default priceReducer;
