import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Orders from './Orders';
import Deposits from './Deposits';
import Chart from './Chart';
import clsx from 'clsx';

export default function MainPage() {

const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
const classes = useStyles();
const [open, setOpen] = React.useState(true);
const handleDrawerOpen = () => {
  setOpen(true);
};
const handleDrawerClose = () => {
  setOpen(false);
};

  return (
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
  );
}