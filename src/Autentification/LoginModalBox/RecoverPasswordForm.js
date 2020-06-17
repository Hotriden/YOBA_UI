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
import { Link } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function RecoverPasswordForm(props) {

  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [click, setClick] = useState(false);
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
        setOpen(true);
        var result = await axios.post('http://localhost:54889/api/recover', { Email: email});
        setResponseMsg(result.data);
        setClick(true);
        setOpen(false);
      }
      catch(error){
        setErrorEmail(error.message);
        setOpen(false);
      }
    }
  }

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={open}>
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
                    className='field-log'
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Grid>
            : null }
            <Grid item xs={12}>
                <h2 className={classes.errorMsg}>{errorEmail}</h2>
                <h2 className={classes.responseMsg}>{responseMsg}</h2>
            </Grid>
            <Grid item xs={12}>
              { !click ?
                <Button className='button-log' disabled={!email} variant="contained" color="primary" size="large" onClick={sendEmail}>
                    Recover
                </Button>
                : 
                <Link className={classes.main} to="/">
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RecoverPasswordForm)
