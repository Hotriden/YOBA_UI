import React, {useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../ComponentStyle.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MainTable from '../MainTable';
import OperationsTable from '../OperationsTable';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const tempDataOperations = [
  {number: '000667', date: '16.06.20', Customer: 'unnamed', Manager: 'Dirty John', Article: '000222', quantity: 20, value: '$20.20'},
  {number: '000668', date: '16.06.20', Customer: 'John B.', Manager: 'Stinky Billy', Article: '000231', quantity: 200, value: '$320.00'},
  {number: '000669', date: '16.06.20', Customer: 'Bill C.', Manager: 'Angry Dummy', Article: '012220', quantity: 440, value: '$440.00'},
  {number: '000670', date: '17.06.20', Customer: 'Obama B.', Manager: 'Fartzilla', Article: '999221', quantity: 50, value: '$200.00'},
  {number: '000671', date: '18.06.20', Customer: 'Tramp D.', Manager: 'Conny Pony', Article: '121222', quantity: 10, value: '$11.20'},
  {number: '000672', date: '29.06.20', Customer: 'Baiden J.', Manager: 'Dirty John', Article: '331222', quantity: 80, value: '$8000.00'},
  {number: '000673', date: '30.06.20', Customer: 'Monica C.', Manager: 'Dirty John', Article: '109222', quantity: 5, value: '$3.50'}
];

const tempDataInfo = [
  {Manager: 'Fartzilla', summaryOrders: '$20043.23', successPersent: '80.2%'},
  {Manager: 'Conny Pony', summaryOrders: '$10002.90', successPersent: '90.2%'},
  {Manager: 'Dirty John', summaryOrders: '$9200.00', successPersent: '65.5%'},
  {Manager: 'Stinky Billy', summaryOrders: '$100.90', successPersent: '100.00%'}
];

const tempColumnsOperations = [
  { title: 'Number', field: 'number'},
  { title: 'Date Time', field: 'date' },
  { title: 'Customer', field: 'Customer' },
  { title: 'Manager', field: 'Manager' },
  { title: 'Article', field: 'Article' },
  { title: 'Quantity', field: 'quantity'},
  { title: 'Value', field: 'value'}
];

const tempColumnsInfo = [
  { title: 'Manager', field: 'Manager'},
  { title: 'Orders this month', field: 'summaryOrders' },
  { title: '% of sales', field: 'successPersent' }
];

function Orders(props) {

const [fetchData, setFetchData] = useState([{}]);
const [operation, setOperation] = useState('');
const [report, setReport] = useState('');
const { classes } = props;
const handleClickOperation = (event) => setOperation(event.currentTarget);
const handleClickReport = (event) => setReport(event.currentTarget);
const handleCloseOperation = () => {
  setOperation(null);
};
const handleCloseReport = () => {
  setReport(null);
};
const cookies = new Cookies();

useEffect(()=>{
  setSuppliers();
});

async function setSuppliers(){
  //var result = await GetSuppliers();
  setFetchData(tempDataOperations); //// SHOULD BE DATA FROM API
}

  return (
    <div>
    <Backdrop className={classes.backdrop} open={props.Store.LoadBar}>
      <CircularProgress color="inherit" />
    </Backdrop>
    <Grid container spacing={1}>
      <Grid item sx={12}>
        <div className='buttonsPanel'>
          <Button
            variant="outlined"
            color="inherit"
            aria-controls="simple-menu" 
            className="buttonOperation"
            aria-haspopup="true"
            onClick={handleClickOperation}
          >
            Operations
          </Button>
          <Menu
            className="menuItem" 
            id="simple-menu"
            anchorEl={operation}
            keepMounted
            open={Boolean(operation)}
            onClose={handleCloseOperation}
          >
            <MenuItem onClick={handleCloseReport}>New Order</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Sale</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Bill</MenuItem>
          </Menu>
          <Button
              variant="outlined"
              color="inherit"
              aria-controls="simple-menu" 
              className="buttonReport"
              aria-haspopup="true"
              onClick={handleClickReport}
            >
            Reports
          </Button>
          <Menu
            className="menuItem" 
            id="simple-menu"
            anchorEl={report}
            keepMounted
            open={Boolean(report)}
            onClose={handleCloseReport}
          >
            <MenuItem onClick={handleCloseReport}>Orders</MenuItem>
            <MenuItem onClick={handleCloseReport}>Sales</MenuItem>
            <MenuItem onClick={handleCloseReport}>Bills</MenuItem>
          </Menu>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Paper className='materialTable'>
          <MainTable dataArray={cookies.get('_uc')?fetchData:tempDataOperations} columns={tempColumnsOperations} title='Recent orders'/>
        </Paper>
      </Grid>
      <Grid item xs={6} >
        <Paper className='infoTable'>
          <OperationsTable dataArray={cookies.get('_uc')?fetchData:tempDataOperations} columns={tempColumnsOperations} title='Recent orders'/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className='infoTable'>
          <OperationsTable dataArray={cookies.get('_uc')?fetchData:tempDataInfo} columns={tempColumnsInfo} title='Orders info'/>
        </Paper>
      </Grid>
    </Grid>
    </div>
  );
}

const styles = theme => ({
  backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(Orders);