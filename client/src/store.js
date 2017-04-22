import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

const store = createStore(
  reducers, {},
  applyMiddleware(
    reduxThunk,
    reduxLogger()
  )
);

export default store;
