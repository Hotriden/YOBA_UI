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
  {article: '001120', operationType: 'Transfer', from: 'WH3', to: 'WHM', quantity: 1000, value: 100.20},
  {article: '031130', operationType: 'Sale', from: 'WH8', to: 'WHS', quantity: 2, value: 2.20},
  {article: '000005', operationType: 'Sale', from: 'WH3', to: 'WHS', quantity: 5, value: 50.50},
  {article: '022252', operationType: 'Sale', from: 'WH3', to: 'WHS', quantity: 1, value: 10.40},
  {article: '003330', operationType: 'Sale', from: 'WH3', to: 'WHS', quantity: 10, value: 0.40},
  {article: '001110', operationType: 'Arrival', from: 'WHA', to: 'WH1', quantity: 1000, value: 3000.20},
  {article: '033322', operationType: 'Transfer', from: 'WH1', to: 'WH4', quantity: 1000, value: 3000.20}
];

const tempDataInfo = [
  {article: '099920', mainSupplier: 'Riccardo Ro.', quantity: 500, value: 550.10},
  {article: '011130', mainSupplier: 'Leonelly M.C.', quantity: 200, value: 250.00},
  {article: '003443', mainSupplier: 'Bruno&Co', quantity: 800, value: 640.00},
  {article: '022240', mainSupplier: 'LTD Steel Ind', quantity: 440, value: 440.00},
  {article: '01224z', mainSupplier: 'Simpson J.B.', quantity: 20, value: 400.00},
  {article: '03334a', mainSupplier: 'Simpson J.B.', quantity: 258, value: 8000.20},
  {article: '000981', mainSupplier: 'LTD Steel Ind', quantity: 2020, value: 4002.20}
];

const tempColumnsOperations = [
  { title: 'Article', field: 'article'},
  { title: 'Operation', field: 'operationType' },
  { title: 'Ship From', field: 'from' },
  { title: 'Ship To', field: 'to' },
  { title: 'Quantity', field: 'quantity'},
  { title: 'Value', field: 'value'}
];

const tempColumnsInfo = [
  { title: 'Article', field: 'article'},
  { title: 'Main Supplier', field: 'mainSupplier' },
  { title: 'Quantity', field: 'quantity' },
  { title: 'Summary Value', field: 'value' }
];

function Receipts(props) {

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

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(Receipts);