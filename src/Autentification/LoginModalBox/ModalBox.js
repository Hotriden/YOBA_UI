import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import './ModalBoxStyle.css';
import './Animate.css';
import GetJwt from '../JWT/GetJwt';
import { connect } from 'react-redux'; 

function ModalBox (props) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const cleanBox = () => {
        setModalIsOpen(false);
        setEmail('');
        setPassword('');
    }

    function OpenRegWindow(){
        props.Store['REG_WINDOW'] = 'true'
    }

    const jwtApi = e => {
        e.preventDefault();
        GetJwt({email, password});
        window.location.reload();
    }

    return(
        <div className='ModalBox'>
            <Button
              variant="outlined"
              color="inherit"
              endIcon={<ExitToAppIcon fontSize="large"></ExitToAppIcon>}
              onClick={() => setModalIsOpen(!modalIsOpen)}
            >
                Sign In
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              endIcon={ <FaceIcon fontSize="large"/> }
              onClick={OpenRegWindow}
            >
                Sign Up
            </Button>

            <div >
                <Modal className='animated bounceInDown delay-0.5s' isOpen={modalIsOpen} onRequestClose={() => cleanBox()} ariaHideApp={false}>
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

export default connect(
  state => ({
    Store: state
  }),
  dispatch => ({
    OpenRegWindow: (value) => {
      dispatch({ type: 'REG_WINDOW:', payload: value });
    }
  })
)(ModalBox);
      