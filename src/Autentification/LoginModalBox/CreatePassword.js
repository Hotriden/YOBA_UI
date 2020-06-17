import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Recover from '../Recover';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Cookies from 'universal-cookie';

function RecoverPasswordForm(props) {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passErrors, setPassErrors] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const { classes } = props;
  var urlsearch = window.location.pathname;
  const cookies = new Cookies();


  function validateForm() {

    if (newPassword === '') {
      setPassErrors('Please enter your password.');
      return false;
    }

    if (!newPassword.match(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)) {
      setPassErrors("Please enter secure and strong password.");
      return false;
    }

    if(newPassword !== confirmPassword || confirmPassword === ''){
      setPassErrors('Password and confirm password not the same');
      return false;
    }

    return true;
  }

  async function sendEmail() {
    var url = urlsearch.split("'");
    if(validateForm()){
      var result = await axios.post('http://localhost:54889/api/ResetPassword', { Password: newPassword, Token: url[2], Email: url[1], ConfirmPassword: confirmPassword });
      console.log(url[2], url);
      setResponseMsg(result.data);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.mainWindow}>
        <Grid container spacing={1} className={classes.grid}>
            <Grid  item xs={12}>
                <h2 className={classes.logbanner}>Input new password</h2>
            </Grid>
            <Grid  item xs={6}>
                <TextField 
                    size='small'
                    className='field-log'
                    label="Password" 
                    variant="outlined" 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
            </Grid>
            <Grid  item xs={6}>
                <TextField 
                    size='small'
                    className='field-log'
                    label="Email" 
                    variant="outlined" 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <h2 className={classes.errorMsg}>{passErrors}</h2>
                <h2 className={classes.responseMsg}>{responseMsg}</h2>
            </Grid>
            <Grid item xs={12}>
                <Button className='button-log' variant="contained" color="primary" size="large" onClick={sendEmail}>
                    Recover
                </Button>
            </Grid>
        </Grid>
        </Paper>
    </div>
  );
}

const styles = () => ({
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
    marginTop: 5,
    marginLeft: 10,
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
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RecoverPasswordForm)
