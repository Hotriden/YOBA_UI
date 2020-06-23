import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from '../../Components/MainPageComponent/Title';
import Grid from '@material-ui/core/Grid';
import '../ComponentStyle.scss';

// Generate Order Data
function createData(id, number, date, from, shipTo, article, amount, value) {
  return { id, number, date, from, shipTo, article, amount, value };
}

const rows = [
  createData(0, '000021', '16 Mar, 2019', 'WareHouse-3', 'WareHouse-1', '3444899', '1000', 3000.20),
  createData(1, '000020', '16 Mar, 2019', 'Supplier-10', 'WareHouse-3', '11188', '255', 30.20),
  createData(2, '000019', '16 Mar, 2019', 'WareHouse-1', 'Customer-3', '9995123', '3', 90.32),
  createData(3, '000018', '16 Mar, 2019', 'Supplier-1', 'WareHouse-6', '4889952', '1110', 990.10),
  createData(4, '000017', '15 Mar, 2019', 'WareHouse-4', 'WareHouse-11', '33000', '330', 223.03),
];

export default function WareHouse() {
  return (
    <div>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper className='mainWareHouse'>
          <Title>New operation</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Article</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
          </Table>
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
              {rows.map((row) => (
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
            {rows.map((row) => (
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
  </Grid>
  </div>
  );
}