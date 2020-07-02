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
  {number: '000021', date: '16.03.20 12:00:01', from: 'WHM', to: 'WH1', quantity: 50, value: '$300.20'},
  {number: '000022', date: '16.03.20 14:02:33', from: 'WH2', to: 'WH10', quantity: 130, value: '$3001.50'},
  {number: '000023', date: '16.03.20 15:22:53', from: 'WHM', to: 'WH8', quantity: 11000, value: '$90000.00'},
  {number: '000024', date: '17.03.20 09:05:18', from: 'WH1', to: 'WH5', quantity: 1031, value: '$403.31'},
  {number: '000025', date: '18.03.20 10:40:02', from: 'WHM', to: 'WH8', quantity: 80, value: '$640.00'},
  {number: '000027', date: '18.03.20 12:03:11', from: 'WHM', to: 'WH8', quantity: 100, value: '$1000.00'},
  {number: '000028', date: '19.03.20 08:55:11', from: 'WH8', to: 'WH3', quantity: 700, value: '$2100.00'}
];

const tempDataWareHouseInfo = [
  {name: 'WHM', address: 'Washington st. 10', quantity: 100000, value: '$320000.00'},
  {name: 'WH1', address: 'Washington st. 8', quantity: 10, value: '$30.20'},
  {name: 'WH3', address: 'Washington st. 5', quantity: 235003, value: '$602102.20'},
  {name: 'WH5', address: 'Lingston st, 1', quantity: 2433, value: '$88003.26'},
  {name: 'WH6', address: 'Riverstone st, 23', quantity: 8889, value: '$21221.98'},
  {name: 'WH8', address: 'Washstreet st. 2', quantity: 77, value: '$230.55'},
  {name: 'WH10', address: 'Riverstrone st, 23', quantity: 9, value: '$23.30'}
];

const tempColumnsOperations = [
  { title: 'Number', field: 'number'},
  { title: 'Date Time', field: 'date' },
  { title: 'Ship From', field: 'from' },
  { title: 'Ship To', field: 'to' },
  { title: 'Quantity', field: 'quantity'},
  { title: 'Value', field: 'value'}
];

const tempColumnsWareHouseInfo = [
  { title: 'Name', field: 'name'},
  { title: 'Address', field: 'address' },
  { title: 'Quantity', field: 'quantity' },
  { title: 'Summary Value', field: 'value' }
];

function WareHouse(props) {

const [fetchData, setFetchData] = useState([{}]);
const [operation, setOperation] = useState('');
const [report, setReport] = useState('');
const { classes } = props;
const handleClickOperation = (event) => setOperation(event.currentTarget);
const handleClickReport = (event) => setReport(event.currentTarget);
const handleCloseOperation = () => setOperation(null);
const handleCloseReport = () => setReport(null);
const cookies = new Cookies();

useEffect(()=>{
  setWareHouseData();
});

async function setWareHouseData(){
  //var result = await GetWareHouse();
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
            <MenuItem onClick={handleCloseReport}>New WareHouse</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Transfer</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Arrivals</MenuItem>
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
            <MenuItem onClick={handleCloseReport}>WareHouses</MenuItem>
            <MenuItem onClick={handleCloseReport}>Transfers</MenuItem>
            <MenuItem onClick={handleCloseReport}>Arrivals</MenuItem>
          </Menu>
        </div>
      </Grid>
      <Grid item md={10} lg={12} xs={12}>
        <Paper className='materialTable'>
          <MainTable dataArray={cookies.get('_uc')?fetchData:tempDataOperations} columns={tempColumnsOperations} title='Warehouses recent operations'/>
        </Paper>
      </Grid>
      <Grid item md={4} lg={6} xs={6}>
        <Paper className='infoTable'>
          <OperationsTable dataArray={cookies.get('_uc')?fetchData:tempDataOperations} columns={tempColumnsOperations} title='Warehouses recent operations'/>
        </Paper>
      </Grid>
      <Grid item lg={6} xs={6}>
        <Paper className='infoTable'>
          <OperationsTable dataArray={cookies.get('_uc')?fetchData:tempDataWareHouseInfo} columns={tempColumnsWareHouseInfo} title='WareHouses info'/>
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

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(WareHouse);