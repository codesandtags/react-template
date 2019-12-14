import { combineReducers } from 'redux';
import reducerExample, { InitialState } from './reducerExample';

// If you need to add more reducers, please combine them below.
export interface ApplicationState {
  example: InitialState
}

export const rootReducer = combineReducers<ApplicationState>({
  example: reducerExample
});
