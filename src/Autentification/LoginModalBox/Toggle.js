import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import Modal from 'react-modal';
import './Animate.css';
import './ModalBoxStyle.css';

export default class Toggle extends Component {
    state = {
        on: false,
    }

    toggle = () => {
        this.setState({
           on: !this.state.on 
        })
    }

    render(){
        return(
            <div>
                {this.state.on && (
        
                <Modal className='animated bounceInDown delay-0.5s'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>You can autorize</Grid>
                    <Grid item xs={12}>Youself here</Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={6}>
                        <Button className='button' variant="contained">
                            Primary
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button className='button' variant="contained">
                            Primary
                        </Button>
                    </Grid>
                </Grid>
                </Modal>
                )}
                <FaceIcon fontSize="large" onClick={this.toggle}/>
            </div>
        )
    }
}