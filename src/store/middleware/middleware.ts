import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default function createMiddleware() {
  const middleware = [thunk];

  return composeWithDevTools(applyMiddleware(...middleware));
}
