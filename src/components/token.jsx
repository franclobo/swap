import { useSelector, useDispatch } from 'react-redux';
import { fetchTokens } from '../redux/tokens';
import Tokens from './tokens';
import './token.css';

function Token({ handleSelectToken }) {

  const dispatch = useDispatch();
  const tokens = useSelector(state => state.tokens);

  if (!tokens.length) {
    dispatch(fetchTokens());
    return <div className="loading">Loading ...</div>;
  }

  return (
    <div className="token-container">
      <ul className="token-list">
        {tokens.map((token) => (
          <div key={token.address} className="token-item" onClick={() => handleSelectToken(token)}>
            <Tokens
              img={token.logoURI}
              symbol={token.symbol}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Token
