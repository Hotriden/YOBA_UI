import React, { useState } from 'react';
import Modal from 'react-modal';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import GetJwt from '../JWT/GetJwt';
import './Animate.css';
import './ModalBoxStyle.css';
import { connect } from 'react-redux'; 
import { useDispatch } from 'react-redux';
import { RegistrationSwitcher } from '../../GlobalState/Actions/RegistrationSwitcher';
import { LogInSwitcher } from '../../GlobalState/Actions/LogInSwitcher';

function ModalBox (props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const cleanBox = () => {
        dispatch(LogInSwitcher());
        setEmail('');
        setPassword('');
    }

    const jwtApi = e => {
        e.preventDefault();
        GetJwt({email, password});
        window.location.reload();
    }

    return(
        <div >
            <Button
              variant="outlined"
              color="inherit"
              endIcon={<ExitToAppIcon fontSize="large"></ExitToAppIcon>}
              onClick={() => dispatch(LogInSwitcher())}
            >
                Sign In
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              endIcon={ <FaceIcon fontSize="large"/> }
              onClick={() => dispatch(RegistrationSwitcher())}
            >
                Sign Up
            </Button>
            <div>
                <Modal className='animated fadeIn delay-0.7s' isOpen={props.Store.LogInWindow} onRequestClose={() => cleanBox()} ariaHideApp={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className="log-banner">
                            <p>Input your email and password</p>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                size='small'
                                className='field-log'
                                label="Email" 
                                variant="outlined" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
                            <Button className='button-log' variant="contained" color="primary" size="large" onClick={jwtApi}>
                                Log In
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className='button-forg' variant="contained" color="primary">
                                Remind
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
        </div>
        );
    }

export default connect(state => ({ Store: state}))(ModalBox);
      