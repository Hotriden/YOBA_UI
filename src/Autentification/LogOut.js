import React from 'react';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './ModalBox/ModalBoxStyle.scss';

const cookies = new Cookies();

function LogOut () {

    const Out = e => {
        e.preventDefault();
        cookies.remove('_uc');
        cookies.remove('_user');
        window.location.reload();
    }

    return(
        <div className='ModalBox'>
            <Button
              variant="outlined"
              color="inherit"
              endIcon={<ExitToAppIcon fontSize="large"></ExitToAppIcon>}
              onClick={Out}
            >
                Log Out
            </Button>
        </div>
        );
    }

export default LogOut;