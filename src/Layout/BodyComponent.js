import React, {useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Chart from '../Components/MainPageComponent/Chart';
import Copyright from '../Components/MainPageComponent/Copyright';
import OperationTable from '../Components/OperationsTable';
import Cookies from 'universal-cookie';
import './bodyComponent.scss';


const tempDataOperations = [
  {number: '000667', date: '16.06.20', Customer: 'unnamed', Manager: 'Dirty John', Article: '000222', quantity: 20, value: '$20.20'},
  {number: '000668', date: '16.06.20', Customer: 'John B.', Manager: 'Stinky Billy', Article: '000231', quantity: 200, value: '$320.00'},
  {number: '000671', date: '18.06.20', Customer: 'Tramp D.', Manager: 'Conny Pony', Article: '121222', quantity: 10, value: '$11.20'},
  {number: '000672', date: '29.06.20', Customer: 'Baiden J.', Manager: 'Dirty John', Article: '331222', quantity: 80, value: '$8000.00'},
  {number: '000673', date: '30.06.20', Customer: 'Monica C.', Manager: 'Dirty John', Article: '109222', quantity: 5, value: '$3.50'}
];

const tempDataInfo = [
  {Date: '02.07.20', Customer: 'Billy J.', Payment: '$243.23' },
  {Date: '01.07.20', Customer: 'Rorry H.', Payment: '$43.62' },
  {Date: '01.07.20', Customer: 'Clinton M.', Payment: '$113.74' },
  {Date: '30.06.20', Customer: 'Bush J.', Payment: '$1008.90' },
];

const tempColumnsOperations = [
  { title: 'Number', field: 'number'},
  { title: 'Date Time', field: 'date' },
  { title: 'Customer', field: 'Customer' },
  { title: 'Manager', field: 'Manager' },
  { title: 'Article', field: 'Article' },
  { title: 'Quantity', field: 'quantity'},
  { title: 'Value', field: 'value'}
];

const tempColumnsInfo = [
  { title: 'Date', field: 'Date'},
  { title: 'Customer', field: 'Customer' },
  { title: 'Payment', field: 'Payment' }
];

const chartData = [
  {Date: '26.06.20', Payment: 1008.90, },
  {Date: '27.06.20', Payment: 43.62, },
  {Date: '28.06.20', Payment: 113.74, },
  {Date: '29.06.20', Payment: 243.23, },
  {Date: '30.06.20', Payment: 662.23, },
  {Date: '01.07.20', Payment: 450.00, },
  {Date: '02.07.20', Payment: 1243.60, },
]

const cookies = new Cookies();

export default function BodyComponent(props) {

  const classes = useStyles();

  return(
    <main className='content'>
      <div className='appBarSpacer'/>
      <Container maxWidth="lg" className="container">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className='paper'>
              <Chart dataArray={chartData}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <OperationTable dataArray={cookies.get('_uc')?"":tempDataInfo} columns={tempColumnsInfo} title='Payments info' linkOnTable="/Payments" linkTableName="See more payments"/>
          </Grid>
          <Grid item xs={12}>
            <OperationTable dataArray={cookies.get('_uc')?"":tempDataOperations} columns={tempColumnsOperations} title='Order info' linkOnTable="/Orders" linkTableName="See more orders"/>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
    );
  }

  const useStyles = makeStyles((theme) => ({
      appBarSpacer: theme.mixins.toolbar,
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 240
      }
   }));