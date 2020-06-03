import React from 'react';
import Layout from './Layout/Layout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  REG_WINDOW : 'false',
  MAIN_WINDOW : ''
};

function yobaState(state = initialState, action) {
  if (action.type === 'OPEN_REG') {
    return {
      OPEN_REG : action.payload
    };
  }
  return state;
}

const store = createStore(yobaState);

function App() {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

export default App;