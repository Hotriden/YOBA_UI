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
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={props.Store.LoadBar}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={classes.mainWindow}>
        <Grid container spacing={1} className={classes.grid}>
            {!click ?
            <Grid  item xs={12}>
                <h2 className={classes.logbanner}>Input your email</h2>
            </Grid>
            : null }
            {!click ?
            <Grid  item xs={12}>
                <TextField 
                    size='small'
                    className={'field-recover'}
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={keyBoard_enter}
                />
            </Grid>
            : null }
            <Grid item xs={12}>
                <h2 className={classes.errorMsg}>{errorEmail}</h2>
                <h2 className={classes.responseMsg}>{responseMsg}</h2>
            </Grid>
            <Grid item xs={12}>
              { !click ?
                <Button className={classes.button_log} disabled={!email} variant="contained" color="primary" size="large" onClick={sendEmail}>
                    Recover
                </Button>
                : 
                <Link to="/">
                  <Button className='button-log' variant="contained" color="primary" size="large">
                      Home
                  </Button>
                </Link>
              }
            </Grid>
        </Grid>
        </Paper>
    </div>
  );
}

const styles = (theme) => ({
  root: {
    display: 'grid',
    marginTop: 100,
    marginLeft: 80,
    height: '100%',
    width: '35%'
  },
  Next: {
    display: 'grid',
    margitTop: 20
  },
  logbanner: {
    marginTop: 5,
    marginLeft: 25,
    height: 10,
    color:  '#3f51b5',
    fontSize: 22,
    outline: 'none',
    border: 'none'
  },
  errorMsg: {
    padding: 0,
    marginTop: 5,
    marginLeft: 10,
    margin: 0,
    paddingTop: 15,
    fontSize: 22,
    color: 'red',
  },
  responseMsg: {
    padding: 0,
    marginTop: 5,
    marginLeft: 10,
    margin: 0,
    paddingTop: 15,
    fontSize: 22,
    color:  '#3f51b5',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button_log: {
    height: 30,
    width: 140,
    marginBottom: 20,
    marginLeft: 40,
    marginTop: -20
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RecoverPasswordForm)
