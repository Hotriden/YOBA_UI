import React, {useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';

function getSteps() {
  return ['Input personal data', 'Create an ad group', 'Create an ad'];
}



function RegistrationForm(props) {

  function getStepContent(step) {
    switch (step) {
      case 0:
        return ( 
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <TextField id="standard-secondary" label="First name" color="secondary" />  
                <TextField id="standard-secondary" label="Last name" color="secondary" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="standard-secondary" label="Email adress" color="secondary" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="standard-secondary" label="Password" type="password" autoComplete="current-password"/>
                <TextField id="standard-secondary" label="Confirm Password" type="password" autoComplete="current-password"/>
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
          </div>);
      case 1:
        return (
          <div>
            <p>I agree to get letters on my email adress that are required to obtain registration procedure.</p>
            <FormControlLabel value='1' control={<Checkbox color="primary" onClick={accessField} />} label="I grant permission to YOBA Application to store and use my personal data" labelPlacement="start"/>
          </div>
        );
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
  }
  
  const [activeStep, setActiveStep] = useState(0);
  const [accessReg, setAccessReg] = useState(false);

  const steps = getSteps();
  const { classes } = props;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const accessField = () => {
    setAccessReg(!accessReg);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className='actionsContainer'>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack} className='button' >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext} className='button'>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className='resetContainer'>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className='button'>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

const styles = theme => ({
  root: {
    display: 'grid',
    marginTop: 100,
    marginLeft: 80,
    height: 250,
    width: '80%'
  }
});


export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RegistrationForm)
