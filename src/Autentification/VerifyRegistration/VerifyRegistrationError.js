import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import './Verify.scss';

function VerifyRegistration(props) {

  return (
    <div className='rootVR'>
      <Paper>
        <h2 className='logbannerVR'>Verification failder</h2>
        <div className='btnFieldContainerVR'>
          <Link to="/">
            <Button className='buttonLogVR' variant="contained" color="primary" size="large">
                Home
            </Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
}

export default VerifyRegistration;
