import * as actionType from '../actions/actionTypes';

export interface Action {
  type: string;
  value: string;
}

export interface InitialState {
  applicationName: string;
}

const initialState: InitialState = {
  applicationName: 'Micro Front-End React Template',
};

const reducerExample = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case actionType.MY_NORMAL_ACTION_EXAMPLE:
      return {
        applicationName: action.value,
      };

    case actionType.MY_ASYNC_ACTION_EXAMPLE:
      return {
        applicationName: action.value,
      };
  }

  return state;
};

export default reducerExample;
