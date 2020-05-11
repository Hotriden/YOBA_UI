import React, { useState } from 'react';
import Modal from 'react-modal';
import FaceIcon from '@material-ui/icons/Face';
import './ModalBoxStyle.css';
import './Animate.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';


function ModalBox () {

    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const classes = useStyles();


    return(
        <div className='ModalBox'>
     <Button
       variant="outlined"
       color="inherit"
       className={classes.button}
        endIcon={<FaceIcon fontSize="large"/>}
        onClick={() => setModalIsOpen(true)}
      >
        Log In
      </Button>
      <Button
       variant="outlined"
       color="inherit"
       className={classes.button}
        endIcon={ <ExitToAppIcon fontSize="large"></ExitToAppIcon>}
      >
        Log Out
      </Button>
            <div >
                <Modal className='animated bounceInDown delay-0.5s' isOpen={modalIsOpen}onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
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
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button className='button-log' variant="contained" color="primary" size="large">
                                Log In
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className='button-forg' variant="contained" color="primary">
                                Recall
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
        </div>
        );
    }

export default ModalBox;