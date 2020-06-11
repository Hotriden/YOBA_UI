import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Layout from './Layout/Layout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { allReducer } from './GlobalState/allReducer';
import BodyComponent from './Layout/BodyComponent';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import WareHouse from './Components/WareHouse';

const store = createStore(allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Layout>
        <Route path="/" component={BodyComponent}/>
        <Route path="/WareHouse" component={WareHouse}/>
        <Route path="/Suppliers" component={BodyComponent}/>
      </Layout>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
