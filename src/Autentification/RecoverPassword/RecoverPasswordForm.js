import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { LoadSwitchOn } from '../../GlobalState/Actions/LoadSwitcher';
import { LoadSwitchOff } from '../../GlobalState/Actions/LoadSwitcher';
import { Recover } from '../SendData';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import './RecoverPassword.scss';

function RecoverPasswordForm(props) {

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const { classes } = props;

  function validateForm() {
  
    let errors = [];
  
    if (email === '') {
      setErrorEmail('Please enter your email.');
      errors.push(false);
    }
    else{
      setErrorEmail();
      errors.push('');
    }

    if (!email.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
      setErrorEmail('Please enter valid email');
      errors.push(false);
    }
    else{
      setErrorEmail();
      errors.push('');
    }

    if(errors.every(n=>n === "")){
      setErrorEmail('');
      return true;
    }
    else{
      return false;
    }
  }

  async function sendEmail() {
    if(validateForm()){
      try{
        dispatch(LoadSwitchOn());
        var result = await Recover({email});
        setResponseMsg(result.data);
        setClick(true);
        dispatch(LoadSwitchOff());
      }
      catch(error){
        setErrorEmail(error.message);
        dispatch(LoadSwitchOff());
      }
    }
  }

  const keyBoard_enter=(event)=> {
    if (event.keyCode === 13) {
      sendEmail();
    }
  }

  return (
    <div className='root-RP'>
      <Backdrop className={classes.backdrop} open={props.Store.LoadBar}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className='mainWindow'>
        <Grid container spacing={1} className='grid'>
            {!click ?
            <Grid  item xs={12}>
                <h2 className='logBanner'>Input your email</h2>
            </Grid>
            : null }
            {!click ?
            <Grid  item xs={12}>
                <TextField 
                    size='small'
                    className='fieldRecover'
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={keyBoard_enter}
                />
            </Grid>
            : null }
                <h2 className='errorMessage'>{errorEmail}</h2>
                <h2 className='responseMessage'>{responseMsg}</h2>
              { !click ?
              <div className='LogBlock'>
                <Button className='buttonLog' disabled={!email} variant="contained" color="primary" size="small" onClick={sendEmail}>
                    Recover
                </Button>
              </div>
                : 
                <Link to="/" className='fieldResponse'>
                  <Button variant="contained" className='buttonHome' color="primary" size="large">
                      Home
                  </Button>
                </Link>
              }
        </Grid>
        </Paper>
    </div>
  );
}

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RecoverPasswordForm)
