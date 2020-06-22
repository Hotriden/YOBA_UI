import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Layout from './Layout/Layout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { allReducer } from './GlobalState/allReducer';
import BodyComponent from './Layout/BodyComponent';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Branches from './Components/BranchComponent/Branches';
import Customer from './Components/CustomerComponent/Customers';
import Employee from './Components/EmployeeComponent/Employee';
import Expence from './Components/ExpenceComponent/Expences';
import Income from './Components/IncomeComponent/Incomes';
import Order from './Components/OrderComponent/Orders';
import Payments from './Components/PaymentComponent/Payments';
import Positions from './Components/PositionComponent/Positions';
import Receipt from './Components/ReceiptComponent/Receipts';
import Shipment from './Components/ShipmentComponent/Shipments';
import Supplier from './Components/SupplierComponent/Suppliers';
import Deposits from './Components/DepositComponent/Deposits';
import WareHouse from './Components/WareHouseComponent/WareHouses';
import RegistrationForm from './Autentification/LoginModalBox/RegistrationForm';
import RecoverForm from './Autentification/LoginModalBox/RecoverPasswordForm';
import CreatePassword from './Autentification/LoginModalBox/CreatePassword';

const store = createStore(allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/">
            <BodyComponent/>
          </Route>
          <Route path="/WareHouse">
            <WareHouse/>
          </Route>
          <Route path="/Branch">
            <Branches/>
          </Route>
          <Route path="/Customer">
            <Customer/>
          </Route>
          <Route path="/Employee">
            <Employee/>
          </Route>
          <Route path="/Expence">
            <Expence/>
          </Route>
          <Route path="/Income">
            <Income/>
          </Route>
          <Route path="/Order">
            <Order/>
          </Route>
          <Route path="/Payment">
            <Payments/>
          </Route>
          <Route path="/Position">
            <Positions/>
          </Route>
          <Route path="/Receipt">
            <Receipt/>
          </Route>
          <Route path="/Shipment">
            <Shipment/>
          </Route>
          <Route path="/Supplier">
            <Supplier/>
          </Route>
          <Route path="/Register">
            <RegistrationForm/>
          </Route>
          <Route path="/Recover">
            <RecoverForm/>
          </Route>
          <Route path="/Deposit">
            <Deposits/>
          </Route>
          <Route path="/CreatePassword/:id">
            <CreatePassword/>
          </Route>
        </Layout>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
