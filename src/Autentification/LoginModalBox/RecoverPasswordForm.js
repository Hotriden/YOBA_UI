import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Recover from '../Recover';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendData from '../SendData';
import axios from 'axios';


function RecoverPasswordForm(props) {

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
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
      var result = await axios.post('http://localhost:54889/api/recover', { Email: email});
      setResponseMsg(result.data);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.mainWindow}>
        <Grid container spacing={1} className={classes.grid}>
            <Grid  item xs={12}>
                <h2 className={classes.logbanner}>Input your email</h2>
            </Grid>
            <Grid  item xs={12}>
                <TextField 
                    size='small'
                    className='field-log'
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <h2 className={classes.errorMsg}>{errorEmail}</h2>
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
