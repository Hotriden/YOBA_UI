import React from 'react';
import Layout from './Layout/Layout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { allReducer } from './GlobalState/allReducer';

const store = createStore(allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

export default App;