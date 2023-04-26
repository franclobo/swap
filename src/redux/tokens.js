const url = 'https://tokens.coingecko.com/uniswap/all.json';
const GET_TOKENS = 'GET_TOKENS';

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

export const fetchTokens = () => async (dispatch) => {
  const List = [];
  const response = await fetch(url);
  const data = await response.json();
  const { tokens } = data;
  Object.keys(tokens).forEach((key) => {
    List.push(tokens[key]);
  });
  dispatch(getTokens(List));
};

export default tokenReducer;


