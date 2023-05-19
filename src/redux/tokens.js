const url = 'https://tokens.coingecko.com/uniswap/all.json';
const GET_TOKENS = 'GET_TOKENS';
const FILTER_TOKENS = 'FILTER_TOKENS';

const tokenReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TOKENS:
      return action.tokens;
    default:
      return state;
  }
};

const getTokens = (tokens) => ({
  type: GET_TOKENS,
  tokens,
});

export const filterTokens = (tokens) => ({
  type: FILTER_TOKENS,
  tokens,
});

export const fetchTokens = () => async (dispatch) => {
  const List = [];
  const response = await fetch(url);
  const data = await response.json();
  const { tokens } = data;
  Object.keys(tokens).forEach((key) => {
    List.push(tokens[key]);
  });
  dispatch(getTokens(List));

  const filteredList = List.filter((token) => token.chainId === 1);
  dispatch(filterTokens(filteredList));
};

export default tokenReducer;


