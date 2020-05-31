import React from 'react';
import Layout from './Layout/Layout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

function playlist(state, action) {
  if (action.type === 'OPEN_REG') {
    return [
      true
    ];
  }
  return state;
}

const store = createStore(playlist);

function App() {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

export default App;