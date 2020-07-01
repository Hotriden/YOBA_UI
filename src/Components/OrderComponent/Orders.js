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
  {id: 0, number: '000021', date: '16.03.20', from: 'WH3', to: 'WH1', quantity: 1000, value: 3000.20},
  {id: 1, number: '000022', date: '16.03.20', from: 'WH3', to: 'WH1', quantity: 1000, value: 3000.20},
  {id: 2, number: '000023', date: '16.03.20', from: 'WH3', to: 'WH1', quantity: 1000, value: 3000.20},
  {id: 3, number: '000024', date: '16.03.20', from: 'WH3', to: 'WH1', quantity: 1000, value: 3000.20},
  {id: 4, number: '000024', date: '16.03.20', from: 'WH3', to: 'WH1', quantity: 1000, value: 3000.20},
  {id: 5, number: '000024', date: '16.03.20', from: 'WH3', to: 'WH1', quantity: 1000, value: 3000.20},
  {id: 6, number: '000024', date: '16.03.20', from: 'WH3', to: 'WH1', quantity: 1000, value: 3000.20}
];

const tempDataInfo = [
  {id: 0, name: 'LTD John Wayne', address: 'Washington st. 10', quantity: 1000, value: 3000.20},
  {id: 1, name: 'LTD John Wayne', address: 'Washington st. 10', quantity: 1000, value: 3000.20},
  {id: 2, name: 'LTD John Wayne', address: 'Washington st. 10', quantity: 1000, value: 3000.20},
  {id: 3, name: 'LTD John Wayne', address: 'Washington st. 10', quantity: 1000, value: 3000.20},
  {id: 4, name: 'LTD John Wayne', address: 'Washington st. 10', quantity: 1000, value: 3000.20},
  {id: 5, name: 'LTD John Wayne', address: 'Washington st. 10', quantity: 1000, value: 3000.20},
  {id: 6, name: 'LTD John Wayne', address: 'Washington st. 10', quantity: 1000, value: 3000.20}
];

const tempColumnsOperations = [
  { title: 'Id', field: 'id'},
  { title: 'Number', field: 'number'},
  { title: 'Date Time', field: 'date' },
  { title: 'Ship From', field: 'from' },
  { title: 'Ship To', field: 'to' },
  { title: 'Quantity', field: 'quantity'},
  { title: 'Value', field: 'value'}
];

const tempColumnsInfo = [
  { title: 'Id', field: 'id'},
  { title: 'Name', field: 'name'},
  { title: 'Address', field: 'address' },
  { title: 'Quantity', field: 'quantity' },
  { title: 'Summary Value', field: 'value' }
];

function Orders(props) {

const [fetchData, setFetchData] = useState('');
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
            <MenuItem onClick={handleCloseReport}>New Supplier</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Order</MenuItem>
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
            <MenuItem onClick={handleCloseReport}>Suppliers</MenuItem>
            <MenuItem onClick={handleCloseReport}>Orders</MenuItem>
            <MenuItem onClick={handleCloseReport}>Bills</MenuItem>
          </Menu>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Paper className='materialTable'>
          <MainTable dataArray={cookies.get('_uc')?fetchData:tempDataOperations} columns={tempColumnsOperations} title='Recent operations'/>
        </Paper>
      </Grid>
      <Grid item xs={6} >
        <Paper className='infoTable'>
          <OperationsTable dataArray={cookies.get('_uc')?fetchData:tempDataOperations} columns={tempColumnsOperations} title='Recent operations'/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className='infoTable'>
          <OperationsTable dataArray={cookies.get('_uc')?fetchData:tempDataInfo} columns={tempColumnsInfo} title='Supplier info'/>
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