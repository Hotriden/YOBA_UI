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
  { number: '017122', date: '01.07.20', Customer: 'unnamed', saleNumber: '001030', bill: 'VISA ⠀•••• 3719', value: '$20.20' },
  { number: '017123', date: '01.07.20', Customer: 'John B.', saleNumber: '001035', bill: 'MC ⠀•••• 1253', value: '$320.00'},
  { number: '017124', date: '02.07.20', Customer: 'Bill C.', saleNumber: '001011', bill: '	AMEX ⠀•••• 2000', value: '$440.00'},
  { number: '017125', date: '02.07.20', Customer: 'Obama B.', saleNumber: '001088', bill: 'VISA ⠀•••• 5919', value: '$200.00'},
  { number: '017126', date: '02.07.20', Customer: 'Tramp D.', saleNumber: '001100', bill: 'VISA ⠀•••• 8221', value: '$11.20'},
  { number: '017128', date: '02.07.20', Customer: 'Monica C.', saleNumber: '002390', bill: 'VISA ⠀•••• 3719', value: '$3.50'}
];

const tempDataInfo = [
  { number: '001030', Customer: 'John B', summarySale: '$20043.23', successPersent: '99.5%'},
  { number: '001031', Customer: 'Bill C', summarySale: '$10002.90', successPersent: '89.3%'},
  { number: '001032', Customer: 'Obama B.', summarySale: '$9200.00', successPersent: '0.00%'},
  { number: '001033', Customer: 'Monica C.', summarySale: '$100.90', successPersent: '100.00%'}
];

const tempColumnsOperations = [
  { title: 'Number', field: 'number'},
  { title: 'Date Time', field: 'date' },
  { title: 'Customer', field: 'Customer' },
  { title: 'Sale number', field: 'saleNumber' },
  { title: 'Bill', field: 'bill' },
  { title: 'Value', field: 'value'}
];

const tempColumnsInfo = [
  { title: 'Number', field: 'number'},
  { title: 'Customer', field: 'Customer'},
  { title: 'Summary Sale', field: 'summarySale' },
  { title: 'Sales', field: 'successPersent' }
];

function Payments(props) {

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
            <MenuItem onClick={handleCloseReport}>New Payment</MenuItem>
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
            <MenuItem onClick={handleCloseReport}>Payments</MenuItem>
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

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(Payments);