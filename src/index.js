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
import Sales from './Components/SaleComponent/Sales';
import Supplier from './Components/SupplierComponent/Suppliers';
import Deposits from './Components/DepositComponent/Deposits';
import WareHouse from './Components/WareHouseComponent/WareHouses';
import RegistrationForm from './Autentification/RegistrationForm/RegistrationForm';
import RecoverForm from './Autentification/RecoverPassword/RecoverPasswordForm';
import CreatePassword from './Autentification/CreatePassword/CreatePassword';
import VerifyRegistration from './Autentification/VerifyRegistration/VerifyRegistration';
import VerifyRegistrationError from './Autentification/VerifyRegistration/VerifyRegistrationError';

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
          <Route path="/Sales">
            <Sales/>
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
          <Route path="/Verify">
            <VerifyRegistration/>
          </Route>
          <Route path="/VerifyError">
            <VerifyRegistrationError/>
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
