import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../ComponentStyle.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MainTable from './MainTable';
import WareHouseInfoTable from './WareHouseInfoTable';
import { GetWareHouse } from '../GetData';


function createDataTableOne(id, number, date, from, shipTo, article, amount, value) {
  return { id, number, date, from, shipTo, article, amount, value };
}

function createDataTableTwo(id, number, name, summaryValue, fullness) {
  return { id, number, name, summaryValue, fullness };
}

const rowsTableThree = [
{id: 0, number: '000021', dateTime: '16.03.20', from: 'WareHouse-3', to: 'WareHouse-1', article: 3444899, amount: 1000, value: 3000.20}
];

const rowsTableOne = [
  createDataTableOne(0, '000021', '16.03.20', 'WareHouse-3', 'WareHouse-1', '3444899', '1000', 3000.20),
  createDataTableOne(1, '000020', '16.03.20', 'Supplier-10', 'WareHouse-3', '11188', '255', 30.20),
  createDataTableOne(2, '000019', '16.03.20', 'WareHouse-1', 'Customer-3', '9995123', '3', 90.32),
  createDataTableOne(3, '000018', '16.03.20', 'Supplier-1', 'WareHouse-6', '4889952', '1110', 990.10),
  createDataTableOne(4, '000017', '16.03.20', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
  createDataTableOne(4, '000017', '16.03.20', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
  createDataTableOne(4, '000017', '16.03.20', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
  createDataTableOne(4, '000017', '16.03.20', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
];

const rowsTableTwo = [
  createDataTableTwo(0, '000021', 'WareHouse-3', '3444899', 3.2),
  createDataTableTwo(1, '000020', 'Supplier-10', '11188', 30.20),
  createDataTableTwo(2, '000019', 'WareHouse-1', '9995123', 90.32),
  createDataTableTwo(3, '000018', 'Supplier-1', '4889952', 90.10),
  createDataTableTwo(3, '000018', 'Supplier-1', '4889952', 90.10),
  createDataTableTwo(3, '000018', 'Supplier-1', '4889952', 90.10),
  createDataTableTwo(3, '000018', 'Supplier-1', '4889952', 90.10),
  createDataTableTwo(4, '000017', 'WareHouse-4', '33000', 23.03)
];

export default function WareHouse() {

const [operation, setOperation] = React.useState('');
const [report, setReport] = React.useState('');
const handleClickOperation = (event) => setOperation(event.currentTarget);
const handleClickReport = (event) => setReport(event.currentTarget);
const handleCloseOperation = () => {
  setOperation(null);
};
const handleCloseReport = () => {
  setReport(null);
};

  return (
    <div>
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
            <MenuItem onClick={GetWareHouse}>New WareHouse</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Transfer</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Arrival</MenuItem>
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
      <Grid item xs={12}>
        <Paper className='materialTable'>
          <MainTable dataArray={rowsTableOne} title='Recent operations'/>
        </Paper>
      </Grid>
      <Grid item xs={6} >
        <Paper className='infoTable'>
          <WareHouseInfoTable dataArray={rowsTableThree} title='Some operations'/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className='infoTable'>
          <WareHouseInfoTable dataArray={rowsTableTwo} title='Some another operations'/>
        </Paper>
      </Grid>
    </Grid>
    </div>
  );
}