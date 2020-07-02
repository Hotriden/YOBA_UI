import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Typography from '@material-ui/core/Typography';

export default function Chart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        This month
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={props.dataArray}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="Date" stroke={theme.palette.text.secondary} />
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="Payment" stroke={theme.palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}