import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokens';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const RootReducer = combineReducers({
  tokens: tokenReducer,
});

const store = configureStore({
  reducer: RootReducer,
  middleware: [thunk, logger],
});

export default store;
