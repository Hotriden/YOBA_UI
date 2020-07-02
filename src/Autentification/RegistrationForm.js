import React, {useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { LoadSwitchOn } from '../GlobalState/Actions/LoadSwitcher';
import { LoadSwitchOff } from '../GlobalState/Actions/LoadSwitcher';
import { Link } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Registration } from './SendData';

function getSteps() {
  return ['Input personal data', 'Create an ad group', 'Create an ad'];
}

function RegistrationForm(props) {

  const [activeStep, setActiveStep] = useState(0);
  const [accessReg, setAccessReg] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errorUserName, setErrorUserName] = useState(' ');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorCheckPassword, setErrorCheckPassword] = useState('');
  const [errorSend, setErrorSend] = useState('');
  const [successSend, setSuccessSend] = useState('');
  const [registrationResult, setRegistrationResult] = useState(false);
  const dispatch = useDispatch();

  const steps = getSteps();
  const { classes } = props;
  
  function validateForm() {

    let errors = [];

    if (userName === '' | !userName.match(/^[a-zA-Z ]*$/)) {
      setErrorUserName('Please enter alphabet characters only.');
      errors.push(false);
    }
    else{
      setErrorUserName();
      errors.push('');
    }

    if (email === '') {
      setErrorEmail('Please enter your email.');
      errors.push(false);
    }
    else{
      setErrorEmail();
      errors.push('');
    }

    if (password === '') {
      setErrorPassword('Please enter your password.');
      errors.push(false);
    }
    else{
      setErrorPassword();
      errors.push('');
    }

    if (!password.match(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)) {
      setErrorPassword("Password must be at least 6 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.");
      errors.push(false);
    }
    else{
      setErrorPassword();
      errors.push('');
    }

    if(password !== checkPassword || checkPassword === ''){
      setErrorCheckPassword('Password and confirm password not the same');
      errors.push(false);
    }
    else{
      setErrorCheckPassword();
      errors.push('');
    }

    if(errors.every(n=>n === "")){
      return true;
    }
    else{
      return false;
    }
  }

  async function SendRegistrationData() {
    try{
      dispatch(LoadSwitchOn());
      var result = await Registration({email, password, userName});
      setSuccessSend(result.data);
      if(result.data.status===200){
        setSuccessSend(result.data);
        setRegistrationResult(true);
      }
      if(result.data.status===409){
        setErrorSend("User already exist. Wanna recover your password?")
      }
      dispatch(LoadSwitchOff());
    }
    catch(error){
      if(error.message==='Network Error'){
        setErrorSend(error.message);
      }
      if(error.message==='Request failed with status code 409'){
        setErrorSend("User already exist. Wanna recover your password?")
      }
      else{
        setErrorSend(error.message);
      }
      dispatch(LoadSwitchOff());
    }
  }

const keyBoard_enter=(event)=> {
  if (event.keyCode === 13) {
      handleNext();
  }
}

  function handleNext () {
      if (validateForm())
      {
        if(accessReg===true && activeStep===1)
        {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if(activeStep!==1)
        {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrorSend('');
  };

  function accessField() {
    setAccessReg(!accessReg);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return ( 
          <div>
            <TextField id="standard-secondary" label="User name" color="secondary" value={userName} onChange={e => setUserName(e.target.value)} onKeyDown={keyBoard_enter} />
            <div className={classes.error}>{errorUserName}</div>
            <TextField id="standard-secondary" label="Email adress" type="email" color="secondary" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={keyBoard_enter} />
            <div className={classes.error}>{errorEmail}</div>
            <TextField id="standard-secondary" label="Password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={keyBoard_enter}/>
            <div className={classes.error}>{errorPassword}</div>
            <TextField id="standard-secondary" label="Confirm Password" type="password" autoComplete="current-password" value={checkPassword} onChange={e => setCheckPassword(e.target.value)} onKeyDown={keyBoard_enter}/>
            <div className={classes.error}>{errorCheckPassword}</div>
          </div>);
      case 1:
        return (
          <div>
            <p>&#160;&#160; I agree to get letters on my email adress that are required to obtain registration procedure</p>
            <FormControlLabel control={<Checkbox color="primary" onClick={accessField} onKeyDown={keyBoard_enter} checked={accessReg} />} label="I grant permission to YOBA Application to store and use my personal data" labelPlacement="start"/>
          </div>
        );
      case 2:
        return (
          <div>
            <p>{successSend||errorSend ?null:'Finish procedure and check your ' + email + ' email account for accept registration'}</p>
            <p className={classes.Message}>{successSend ? successSend : null}</p>
            <p className={classes.Next}>{errorSend ? errorSend : null}</p>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  function finish_reg() {
    if(errorSend){
      window.location.assign("/Recover")
    }
    if(successSend){
      window.location.assign("/")
    }
    else{
      SendRegistrationData();
    }
  }

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={props.Store.LoadBar}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
                <div className='actionsContainer'>
                  {!registrationResult ? 
                    <div>
                    <Button disabled={activeStep === 0} onClick={handleBack} className='button' >
                      Back
                    </Button>
                    {activeStep !== steps.length - 1 ?
                      <Button type="submit" disabled={!(userName, email, password, checkPassword) || activeStep === 2 && accessReg === false} 
                      variant="contained" color="primary" onClick={handleNext} className='button'>
                          Next
                      </Button>
                    :
                    <Button type="submit" 
                      variant="contained" color="primary" disabled={registrationResult} onClick={finish_reg} className='button'>
                        {errorSend ? 'Recover' : 'Finish'}
                    </Button>
                    }
                    </div>
                    :
                    <Link className={classes.main} to="/">
                      <Button type="submit" variant="contained" color="primary" className='button'>
                          Main menu
                      </Button>
                    </Link>
                  }
                </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

const styles = theme => ({
  root: {
    marginTop: 100,
    marginLeft: 80,
    height: 250,
    width: '50%'
  },
  Next: {
    display: 'grid',
    margitTop: 20,
    color: 'red'
  },
  error: {
    color: 'red'
  },
  main: {
    textDecoration: 'none',
    color: 'white'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  Message: {
    color: '#3f51b5'
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RegistrationForm)
