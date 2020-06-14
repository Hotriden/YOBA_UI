import React, { useState } from 'react';
import Modal from 'react-modal';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import GetJwt from '../GetJwt';
import './Animate.css';
import './ModalBoxStyle.css';
import { connect } from 'react-redux'; 
import { useDispatch } from 'react-redux';
import { LogInSwitchOn } from '../../GlobalState/Actions/LogInSwitcher';
import { LogInSwitchOff } from '../../GlobalState/Actions/LogInSwitcher';
import { Link } from 'react-router-dom';

function ModalBox (props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const cleanBox = () => {
        dispatch(LogInSwitchOff());
        setEmail('');
        setPassword('');
        setError('');
    }

    const jwtApi = e => {
        e.preventDefault();
        if(validateForm()){
            GetJwt({email, password});
        }
    }

    function validateForm() {

        let errors = [];

        if (email === '') {
            if (password === ''){
                setError('Please enter email and password.');
                errors.push(false);
            }
            else{
                setError('Please enter email');
                errors.push(false);
            }
        }
        else {
            setError('Please enter password')
        }

        if (password === '') {
            if (email === ''){
                setError('Please enter email and password.');
                errors.push(false);
            }
            else{
                setError('Please enter password');
                errors.push(false);
            }
        }
        else {
            setError('Please enter email')
        }

        if(errors.every(n=>n === "")){
          setError('');
          return true;
        }
        else{
          return false;
        }
      }

    const style = {
        textDecoration: 'none',
        color: 'white',
    }
    return(
        <div >
            <Button
              variant="outlined"
              color="inherit"
              className="button-signIn"
              endIcon={<ExitToAppIcon fontSize="large"></ExitToAppIcon>}
              onClick={() => dispatch(LogInSwitchOn())}
            >
                Sign In
            </Button>
            <Link style={style} to="/Register">
            <Button
              variant="outlined"
              className="button-signUp"
              color="inherit"
              endIcon={ <FaceIcon fontSize="large"/> }
              onClick={() => dispatch(LogInSwitchOff())}
            >
                Sign Up
            </Button>
            </Link>
            <div >
                <Modal className='animated fadeIn delay-0.7s' disableEscapeKeyDown='true' 
                        isOpen={props.Store.LogInWindow} onRequestClose={() => cleanBox()} ariaHideApp={false}>
                    <Grid container spacing={1}>
                        <Grid  item xs={12}>
                            <h2 className="log-banner">Input your email and password</h2>
                        </Grid>
                        <Grid  item xs={6}>
                            <TextField 
                                size='small'
                                className='field-log'
                                label="Email" 
                                variant="outlined" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid  item xs={6}>
                            <TextField
                                size='small'
                                className='field-pass'
                                label="Password" 
                                variant="outlined" 
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h2 className="errorMsg">{error}</h2>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className='button-log' variant="contained" color="primary" size="large" onClick={jwtApi}>
                                Log In
                            </Button>
                        </Grid>
                        <Grid className="grid" item xs={6}>
                            <Link style={style} to="/Recover">
                                <Button className='button-forg' variant="contained" color="primary" onClick={() => cleanBox()}>
                                    Recover
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
        </div>
    );
}

export default connect(state => ({ Store: state}))(ModalBox);
      