import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokens';
import priceReducer from './prices';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const RootReducer = combineReducers({
  tokens: tokenReducer,
  prices: priceReducer,
});

const store = configureStore({
  reducer: RootReducer,
  middleware: [thunk, logger],
});

export default store;
