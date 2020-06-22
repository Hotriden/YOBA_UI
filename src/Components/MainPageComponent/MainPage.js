import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Orders from './Orders';
import Deposits from './Deposits';
import Chart from './Chart';

export default function MainPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper>
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper>
          <Deposits />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
}