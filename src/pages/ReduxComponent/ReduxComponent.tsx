import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { asyncActionExample, normalActionExample } from '../../store/actions';
import { ApplicationState } from '../../store/reducers';
import { InitialState } from '../../store/reducers/reducerExample';

const ReduxComponent: React.FC = props => {
    const dispatch = useDispatch();
    const state = useStore().getState();
    const exampleReduxState = useSelector((state: ApplicationState) => state.example);

    return (
        <div>
            <div>
                <div>
                    <button onClick={() => dispatch(normalActionExample())}>Dispatch Normal Action</button>
                </div>

                <div>
                    <button onClick={() => dispatch(asyncActionExample())}>Dispatch Async Action</button>
                </div>
            </div>
            <div className="Margin__container-lg-12--top">
                <div className="Column__offset-md-2">
                    <div
                        style={{
                            backgroundColor: '#7849B8',
                            height: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '3rem auto',
                            padding: '0 1rem',
                        }}
                    >
                        <p>
                            The value is: {exampleReduxState.applicationName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ReduxComponent.propTypes = {
    applicationName: PropTypes.string,
};

const mapStateToProps = (state: InitialState) => ({
    applicationName: state.applicationName,
});

export default ReduxComponent;
