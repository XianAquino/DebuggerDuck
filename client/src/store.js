import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  reducers, {},
  applyMiddleware(
    reduxThunk,
    createLogger()
  )
);

export default store;
