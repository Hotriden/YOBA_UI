import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import GetWareHouses from '../../Hooks/GetWareHouses';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link as LinkReact } from 'react-router-dom';

function createData(id, date, name, amount) {
  return { id, date, name, amount };
}

const rows = [
  createData(0, '22.06.20', 'User32', 112.24),
  createData(2, '22.06.20', 'User07', 100.81),
  createData(4, '21.06.20', 'User03', 8.22)
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
}));

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <LinkReact to='/Deposit'>
          <Link color="primary" href="/Order">
            See more deposits
          </Link>
        </LinkReact>
      </div>
    </React.Fragment>
  );
}