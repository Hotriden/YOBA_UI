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
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'}
];

const tempDataInfo = [
  { not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  { not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'},
  {not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented', not_implemented: 'data not implemented'}
];

const tempColumnsOperations = [
  { title: 'Not implemented', field: 'not_implemented'},
  { title: 'Not implemented', field: 'not_implemented'},
  { title: 'Not implemented', field: 'not_implemented'},
  { title: 'Not implemented', field: 'not_implemented'},
  { title: 'Not implemented', field: 'not_implemented'},

];

const tempColumnsInfo = [
  { title: 'Not implemented', field: 'not_implemented'},
  { title: 'Not implemented', field: 'not_implemented'},
  { title: 'Not implemented', field: 'not_implemented'},
  { title: 'Not implemented', field: 'not_implemented'},
];

function Employee(props) {

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
            <MenuItem onClick={handleCloseReport}>New Employee</MenuItem>
            <MenuItem onClick={handleCloseOperation}>Salary bill</MenuItem>
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
            <MenuItem onClick={handleCloseReport}>Employee</MenuItem>
            <MenuItem onClick={handleCloseReport}>Salary expences</MenuItem>
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

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(Employee);