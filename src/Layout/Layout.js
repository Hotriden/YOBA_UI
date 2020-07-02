import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import ModalBox from '../Autentification/ModalBox';
import RegistrationForm from '../Autentification/RegistrationForm';
import LogOut from '../Autentification/LogOut';
import { supplyListItems, salesListItems, financeListItems, staffListItems } from '../Components/MainPageComponent/ListItems';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { SideBarSwitcher } from '../GlobalState/Actions/SideBarSwitcher';
import { LogInSwitchOff } from '../GlobalState/Actions/LogInSwitcher';
import { RegistrationSwitchOff } from '../GlobalState/Actions/RegistrationSwitcher';
import { RemindSwitchOff } from '../GlobalState/Actions/RemindSwitcher';
import RecoverPasswordForm from '../Autentification/RecoverPasswordForm';
import { Link } from 'react-router-dom';

const cookies = new Cookies();

function Layout(props){
  const { classes } = props;
  const dispatch = useDispatch();

  function CheckMainWindow() {
    if(props.Store.RegistrationWindow===true){
      return <RegistrationForm/>
    }
    if(props.Store.RemindWindow===true){
      return <RecoverPasswordForm/>
    }
    else{
      return props.children;
    }
  }

  function MainPage(){
    dispatch(LogInSwitchOff());
    dispatch(RegistrationSwitchOff());
    dispatch(RemindSwitchOff());
  }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, props.Store.SideBar && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(SideBarSwitcher())}
              className={clsx(classes.menuButton, props.Store.SideBar && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              <Button className={classes.link} onClick={MainPage}><Link to="/" className={classes.link}>YOBA</Link></Button> - Your own business application. Welcome - {cookies.get('_user') ? cookies.get('_user') : 'Guest'}
            </Typography>
            { }
            {cookies.get('_uc') ? <LogOut/> : <ModalBox/> }
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !props.Store.SideBar && classes.drawerPaperClose),
          }}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => dispatch(SideBarSwitcher())}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List onClick={() => dispatch(LogInSwitchOff())}>{supplyListItems}</List>
          <Divider />
          <List onClick={() => dispatch(LogInSwitchOff())}>{salesListItems}</List>
          <Divider />
          <List onClick={() => dispatch(LogInSwitchOff())}>{financeListItems}</List>
          <Divider />
          <List onClick={() => dispatch(LogInSwitchOff())}>{staffListItems}</List>
        </Drawer>
        { CheckMainWindow() }
      </div>
    );
  }

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    }
  },
  link: {
    background: 'none',
    border: 'none',
    fontSize: 24,
    color: 'white',
    marginTop: -1,
    left: 8,
    textDecoration: 'none'
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(Layout)