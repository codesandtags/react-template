import * as actionTypes from './actionTypes';
import { Dispatch } from 'redux';

export const normalActionExample = () => {
  return {
    type: actionTypes.MY_NORMAL_ACTION_EXAMPLE,
    value: 'I am a NORMAL action',
  };
};

export const asyncActionExample = () => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.MY_ASYNC_ACTION_EXAMPLE,
        value: 'I am an ASYNC action',
      });
    }, 2000);
  };
};
