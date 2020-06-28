import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from '../../Components/MainPageComponent/Title';
import Grid from '@material-ui/core/Grid';
import '../ComponentStyle.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { MTablePagination } from 'material-table';
import MainTable from './MainTable';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


function createDataTableOne(id, number, date, from, shipTo, article, amount, value) {
  return { id, number, date, from, shipTo, article, amount, value };
}

function createDataTableTwo(id, number, name, summaryValue, fullness) {
  return { id, number, name, summaryValue, fullness };
}

const rowsTableOne = [
  createDataTableOne(0, '000021', '16.03.20', 'WareHouse-3', 'WareHouse-1', '3444899', '1000', 3000.20),
  createDataTableOne(1, '000020', '16.03.20', 'Supplier-10', 'WareHouse-3', '11188', '255', 30.20),
  createDataTableOne(2, '000019', '16.03.20', 'WareHouse-1', 'Customer-3', '9995123', '3', 90.32),
  createDataTableOne(3, '000018', '16.03.20', 'Supplier-1', 'WareHouse-6', '4889952', '1110', 990.10),
  createDataTableOne(4, '000017', '16.03.20', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
];

const rowsTableTwo = [
  createDataTableTwo(0, '000021', 'WareHouse-3', '3444899', 3.2),
  createDataTableTwo(1, '000020', 'Supplier-10', '11188', 30.20),
  createDataTableTwo(2, '000019', 'WareHouse-1', '9995123', 90.32),
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
        <div className='mainWareHouse'>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickOperation}>
            Open Menu
          </Button>
          <Menu
            className="menuItem" 
            id="simple-menu"
            anchorEl={operation}
            keepMounted
            open={Boolean(operation)}
            onClose={handleCloseOperation}
          >
            <MenuItem onClick={handleCloseOperation}>New WareHouse</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Transfer</MenuItem>
            <MenuItem onClick={handleCloseOperation}>New Arrival</MenuItem>
            <MenuItem onClick={handleCloseOperation}></MenuItem>
          </Menu>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickReport}>
            Open Menu
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
        <MainTable/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className='mainWareHouse'>
          <Title>Recent operations</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Article</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsTableOne.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.from}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.article}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className='mainWareHouse'>
        <Title>WareHouse Data</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Summary Value</TableCell>
              <TableCell>Fullness</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsTableTwo.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>${row.summaryValue}</TableCell>
                <TableCell>{row.fullness}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  </Grid>
  </div>
  );
}