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
import SendRegistrationData from '../JWT/SendRegistrationData';
import { useDispatch } from 'react-redux';
import { RegistrationSwitcher } from '../../GlobalState/Actions/RegistrationSwitcher';

function getSteps() {
  return ['Input personal data', 'Create an ad group', 'Create an ad'];
}

function RegistrationForm(props) {

  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [accessReg, setAccessReg] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errorUserName, setErrorUserName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorCheckPassword, setErrorCheckPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(true);

  const steps = getSteps();
  const { classes } = props;

  function submituserRegistrationForm(e) {
    e.preventDefault();
    validateForm();
  }
  
  function validateForm() {
  
  
    if (userName === '' | !userName.match(/^[a-zA-Z ]*$/)) {
      setFormIsValid(false);
      setErrorUserName('*Please enter alphabet characters only.');
    }
    else{
      setFormIsValid(true);
      setErrorUserName('');
    }
  
    if (email === '') {
      setFormIsValid(false);
      setErrorEmail('*Please enter your email.');
    }
    else{
      setFormIsValid(true);
      setErrorEmail('');
    }
  
    if (email !== 'undefined') {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        setFormIsValid(false);
        setErrorEmail('*Please enter valid email');
      }
    }
    else{
      setFormIsValid(true);
      setErrorEmail('');
    }
  
    if (password === '') {
      setFormIsValid(false);
      setErrorPassword('*Please enter your password.');
    }
    else{
      setFormIsValid(true);
      setErrorPassword('');
    }
  
    if (!password.match(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)) {
      setFormIsValid(false);
      setErrorPassword("*Please enter secure and strong password.");
    }
    else{
      setFormIsValid(true);
      setErrorPassword('');
    }

    if(password !== checkPassword || checkPassword === ''){
      setFormIsValid(false);
      setErrorCheckPassword('*Password and confirm password not the same');
    }
    else{
      setFormIsValid(true);
      setErrorCheckPassword('');
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return ( 
          <div>
                <TextField id="standard-secondary" label="User name" color="secondary" value={userName} onChange={e => setUserName(e.target.value)} />
                <div className="errorMsg">{errorUserName}</div>
                <TextField id="standard-secondary" label="Email adress" type="email" color="secondary" value={email} onChange={e => setEmail(e.target.value)} />
                <div className="errorMsg">{errorEmail}</div>
                <TextField id="standard-secondary" label="Password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="errorMsg">{errorPassword}</div>
                <TextField id="standard-secondary" label="Confirm Password" type="password" autoComplete="current-password" value={checkPassword} onChange={e => setCheckPassword(e.target.value)}/>
                <div className="errorMsg">{errorCheckPassword}</div>
          </div>);
      case 1:
        return (
          <div>
            <p>&#160;&#160; I agree to get letters on my email adress that are required to obtain registration procedure</p>
            <FormControlLabel control={<Checkbox color="primary" onClick={accessField} checked={accessReg} />} label="I grant permission to YOBA Application to store and use my personal data" labelPlacement="start"/>
          </div>
        );
      case 2:
        return (
          <div>
            <p>{accessReg===false ? 'You did not access registration rules. Come back to previous step and accept registration policy' : 'Finish procedure and check your ' + email + ' email account for accept registration'}</p>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }
  
  const handleNext = (e) => {
    submituserRegistrationForm(e);
    if (formIsValid){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const mainPage = () => {
    dispatch(RegistrationSwitcher())
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
                  <Button className={classes.Next} type="submit" disabled={formIsValid === false || activeStep === 2 && accessReg === false} variant="contained" color="primary" onClick={handleNext} className='button'>
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
          <Typography>For finish registration accept url link on your email</Typography>
          <Button variant="contained" color="primary" onClick={mainPage} className='button'>
            Main Page
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
  },
  Next: {
    display: 'grid',
    margitTop: 20
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RegistrationForm)
