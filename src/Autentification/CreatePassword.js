import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CreatePassword } from './SendData';
import { useDispatch } from 'react-redux';
import { LoadSwitchOn } from '../GlobalState/Actions/LoadSwitcher';
import { LoadSwitchOff } from '../GlobalState/Actions/LoadSwitcher';
import { Link } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function RecoverPasswordForm(props) {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passErrors, setPassErrors] = useState('');
  const [responseMsg, setResponseMsg] = useState();
  const { classes } = props;
  const dispatch = useDispatch();
  var urlsearch = window.location.pathname;

  function validateForm() {

    if (newPassword === '') {
      setPassErrors('Please enter your password.');
      return false;
    }

    if (!newPassword.match(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)) {
      setPassErrors("Password must be at least 6 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.");
      return false;
    }

    if(newPassword !== confirmPassword || confirmPassword === ''){
      setPassErrors('Password and confirm password not the same');
      return false;
    }

    return true;
  }

  const keyBoard_enter=(event)=> {
    if (event.keyCode === 13) {
      sendEmail();
    }
  }

  async function sendEmail() {
    var url = urlsearch.split("'");
    var token = url[2];
    var email = url[1];
    if(validateForm()){
      try{
        dispatch(LoadSwitchOn());
        var result = await CreatePassword({newPassword, token, email, confirmPassword});
        setResponseMsg(result.data);
        dispatch(LoadSwitchOff());
      }
      catch(error){
        setPassErrors(error.message);
        dispatch(LoadSwitchOff());
      }
    }
  }

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={props.Store.LoadBar}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={classes.mainWindow}>
        <Grid container spacing={1} className={classes.grid}>
          {!responseMsg ?
          <div>
            <Grid  item xs={12}>
                <h2 className={classes.logbanner}>Create your new password</h2>
            </Grid>
            <Grid  item xs={6}>
                <TextField 
                    className={classes.password}
                    size='small'
                    label="New Password" 
                    variant="outlined" 
                    value={newPassword}
                    onKeyDown={keyBoard_enter}
                    type="password"
                    onChange={e => setNewPassword(e.target.value)}
                />
                <TextField 
                    className={classes.password}
                    size='small'
                    label="Confirm password" 
                    variant="outlined" 
                    value={confirmPassword}
                    onKeyDown={keyBoard_enter}
                    type="password"
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <h2 className={classes.errorMsg}>{passErrors}</h2>
                <h2 className={classes.responseMsg}>{responseMsg}</h2>
            </Grid>
            <Grid item xs={12}>
                <Button className='button-log' variant="contained" color="primary" size="large" onClick={sendEmail}>
                    Create
                </Button>
            </Grid>
            </div>
            :
            <div>
              <Grid item xs={12}>
                <h2 className={classes.logbanner}>Password successfully changed</h2>
            </Grid>
            <Grid item xs={12}>
              <Link to="/">
                <Button className={classes.home_btn} variant="contained" color="primary" size="large" onClick={sendEmail}>
                    Home
                </Button>
              </Link>
            </Grid>
            </div>
          }
        </Grid>
        </Paper>
    </div>
  );
}

const styles = theme => ({
  root: {
    display: 'grid',
    marginTop: 100,
    marginLeft: 80,
    height: 250,
    width: '50%'
  },
  Next: {
    display: 'grid',
    margitTop: 20
  },
  logbanner: {
    marginTop: 15,
    marginLeft: 15,
    height: 20,
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
  password: {
    marginLeft: 10,
    marginTop: 10
  },
  home_btn: {
    display: 'block',
    margin: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RecoverPasswordForm);
