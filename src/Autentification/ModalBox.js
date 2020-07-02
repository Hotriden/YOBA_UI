import React, { useState } from 'react';
import Modal from 'react-modal';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import { GetJwt } from './SendData';
import { GetUser } from './SendData';
import './Animate.css';
import './ModalBoxStyle.css';
import { connect } from 'react-redux'; 
import { useDispatch } from 'react-redux';
import { LogInSwitchOn } from '../GlobalState/Actions/LogInSwitcher';
import { LogInSwitchOff } from '../GlobalState/Actions/LogInSwitcher';
import { LoadSwitchOn } from '../GlobalState/Actions/LoadSwitcher';
import { LoadSwitchOff } from '../GlobalState/Actions/LoadSwitcher';
import { Link } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

function ModalBox (props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { classes } = props;

    const cleanBox = () => {
        dispatch(LogInSwitchOff());
        setEmail('');
        setPassword('');
        setError('');
    }

    async function jwtApi() {
        if(validateForm()){
            try{
                dispatch(LoadSwitchOn());
                var result = await GetJwt({email, password});
                await GetUser();
                setError(result.data);
                dispatch(LoadSwitchOff());
                if(result.data.status===200){
                    window.location.assign("/Recover");
                }
            }
            catch(error){
                if(error.message==='Network Error'){
                    setError(error.message);
                }
                else{
                    setError('Wrong email or password');
                }
                dispatch(LoadSwitchOff());
            }       
        }
    }

    const keyBoard_enter=(event)=> {
        if (event.keyCode === 13) {
            jwtApi(event);
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

        if (!email.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
            setError('Please enter valid email');
            errors.push(false);
          }
          else{
            setError();
            errors.push('');
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
        <div>
        <Backdrop className={classes.backdrop} open={props.Store.LoadBar}>
            <CircularProgress color="inherit" />
        </Backdrop>
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
                <Modal className='animated fadeIn delay-0.9s' disableEscapeKeyDown='true' 
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
                                onKeyDown={keyBoard_enter}
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
                                onKeyDown={keyBoard_enter}
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

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
      }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(ModalBox);