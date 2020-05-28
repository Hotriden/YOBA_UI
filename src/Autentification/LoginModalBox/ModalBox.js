import React, { useState } from 'react';
import Modal from 'react-modal';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import './ModalBoxStyle.css';
import './Animate.css';
import GetJwt from '../JWT/GetJwt';
import axios from 'axios';
import Cookies from 'universal-cookie';

function ModalBox () {

    const cookies = new Cookies();
    const [newEmail, setNewEmail] = useState('');
    const [user, setUser] = useState('Guest');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jwt, setJwt] = useState('');

    const cleanBox = () => {
        setModalIsOpen(false);
        setEmail('');
        setPassword('');
    }
    const jwtApi = e => {
        e.preventDefault();
        setJwt(GetJwt({email, password}));
    }

    const test = e => {
        e.preventDefault();
        axios.get('http://localhost:54889/api/login/secret', {
            headers: {Authorization: `Bearer ${cookies.get('cool-jwt')}`}});
    }

    return(
        <div className='ModalBox'>
            <Button
              variant="outlined"
              color="inherit"
              endIcon={<FaceIcon fontSize="large"/>}
              onClick={() => setModalIsOpen(!modalIsOpen)}
            >
                Log In
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              endIcon={ <ExitToAppIcon fontSize="large"></ExitToAppIcon>}
            >
                Log Out
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
                            <p>{newEmail}</p>
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
                            <Button className='button-forg' variant="contained" color="primary" onClick={test}>
                                Log Out
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
        </div>
        );
    }

export default ModalBox;