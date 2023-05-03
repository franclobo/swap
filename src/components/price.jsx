import { useSelector, useDispatch } from 'react'
import { fetchPrices } from '../redux/prices'
import Prices from './prices'

function Price() {

  const dispatch = useDispatch()
  const prices = useSelector(state => state.prices)

  if (!prices.length) {
    dispatch(fetchPrices())
    return <div className="loading">Loading ...</div>
  }

  return (
    <div className="price-container">
      <ul className="price-list">
        {prices.map((price) => (
          <div key={price.address} className="price-item">
            <Prices
              sellPrice={price.sellPrice}
              buyPrice={price.buyPrice}
              amount={price.amount}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Price
