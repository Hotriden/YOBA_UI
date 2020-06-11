import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SendRegistrationData from '../JWT/SendRegistrationData';
import { useDispatch } from 'react-redux';
import RemindSwitcher from '../../GlobalState/Actions/RemindSwitcher';

function RemindPasswordForm(props) {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errorUserName, setErrorUserName] = useState(' ');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorCheckPassword, setErrorCheckPassword] = useState('');

  const { classes } = props;

  return (
    <div className={classes.root}>
        <Typography>
          <div>
              <TextField id="standard-secondary" label="User name" color="secondary" value={userName} onChange={e => setUserName(e.target.value)} />
              <div className="errorMsg">{errorUserName}</div>
              <TextField id="standard-secondary" label="Email adress" type="email" color="secondary" value={email} onChange={e => setEmail(e.target.value)} />
              <div className="errorMsg">{errorEmail}</div>
              <TextField id="standard-secondary" label="Password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/>
              <div className="errorMsg">{errorPassword}</div>
              <TextField id="standard-secondary" label="Confirm Password" type="password" autoComplete="current-password" value={checkPassword} onChange={e => setCheckPassword(e.target.value)}/>
              <div className="errorMsg">{errorCheckPassword}</div>
          </div>
        </Typography>
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

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(RemindPasswordForm)
