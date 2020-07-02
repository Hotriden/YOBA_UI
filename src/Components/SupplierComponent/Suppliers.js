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
  {number: '000004', date: '17.03.20', from: 'LTD Steel Ind', to: 'WHM', quantity: 2000, value: '$500.50'},
  {number: '000006', date: '17.03.20', from: 'Bruno&Co', to: 'WHM', quantity: 15, value: '$300.00'},
  {number: '000007', date: '17.03.20', from: 'Simpson J.B.', to: 'WHM', quantity: 8, value: '$6400.00'},
  {number: '000009', date: '18.03.20', from: 'Leonelly M.C.', to: 'WHM', quantity: 22000, value: '$2141.48'},
  {number: '000011', date: '19.03.20', from: 'LTD Steel Ind', to: 'WHM', quantity: 12000, value: '$5500.00'},
  {number: '000012', date: '20.03.20', from: 'Riccardo Ro.', to: 'WHM', quantity: 10000, value: '$214.20'}
];

const tempDataInfo = [
  {name: 'LTD Steel Ind', address: 'Washington st. 10', quantity: 4404, value: '$3830.26'},
  {name: 'Bruno&Co', address: 'Washington st. 10', quantity: 3263, value: '$29758.21'},
  {name: 'Riccardo Ro.', address: 'Washington st. 10', quantity: 8929, value: '$15106.60'},
  {name: 'SDC indastry', address: 'Washington st. 10', quantity: 493, value: '$41760.10'},
  {name: 'Farmers coo', address: 'Washington st. 10', quantity: 1495, value: '$10093.00'},
  {name: 'Johnson M.', address: 'Washington st. 10', quantity: 9423, value: '$89373.66'}
];

const tempColumnsOperations = [
  { title: 'Number', field: 'number', },
  { title: 'Date Time', field: 'date' },
  { title: 'Ship From', field: 'from' },
  { title: 'Ship To', field: 'to' },
  { title: 'Quantity', field: 'quantity'},
  { title: 'Value', field: 'value', type: 'numeric'}
];

const tempColumnsInfo = [
  { title: 'Name', field: 'name'},
  { title: 'Address', field: 'address' },
  { title: 'Quantity', field: 'quantity' },
  { title: 'Summary Value', field: 'value' }
];

function Suppliers(props) {

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
          <MainTable dataArray={cookies.get('_uc')?fetchData:tempDataOperations} columns={tempColumnsOperations} title='Suppliers recent operations'/>
        </Paper>
      </Grid>
      <Grid item xs={6} >
        <Paper className='infoTable'>
          <OperationsTable dataArray={cookies.get('_uc')?fetchData:tempDataOperations} columns={tempColumnsOperations} title='Suppliers recent operations'/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className='infoTable'>
          <OperationsTable dataArray={cookies.get('_uc')?fetchData:tempDataInfo} columns={tempColumnsInfo} title='Suppliers info'/>
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

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(Suppliers);