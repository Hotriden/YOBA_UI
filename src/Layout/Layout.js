import React, {Component, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import { supplyListItems, salesListItems, financeListItems, staffListItems } from '../Components/listItems';
import ModalBox from '../Autentification/LoginModalBox/ModalBox';
import BodyComponent from './BodyComponent';
import RegistrationForm from '../Autentification/LoginModalBox/RegistrationForm';
import Cookies from 'universal-cookie';
import LogOut from '../Autentification/LoginModalBox/LogOut';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

const cookies = new Cookies();

class Layout extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchNodes: "",
      openBar : true
    }
  }

  handleDrawerOpen = () => {
    this.state.openBar = true;
    this.forceUpdate()
  }

  handleDrawerClose = () => {
    this.state.openBar = false;
    this.forceUpdate()
  }

  regWin = () => {
    if(this.props.State['REG_WINDOW']==='true'){
      return 'true'
    }
    else{
      return 'false'
    }
    this.forceUpdate();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.openBar && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, this.state.openBar && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              YOBA - Your own business application. Welcome -  {cookies.get('_user') ? cookies.get('_user') : 'Guest'}
            </Typography>
            { }
            {cookies.get('_uc') ? <LogOut/> : <ModalBox/> }
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !this.state.openBar && classes.drawerPaperClose),
          }}
          openBar={this.state.openBar}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{supplyListItems}</List>
          <Divider />
          <List>{salesListItems}</List>
          <Divider />
          <List>{financeListItems}</List>
          <Divider />
          <List>{staffListItems}</List>
        </Drawer>
        { this.regWin ? <RegistrationForm /> : <BodyComponent/>}
      </div>
    );
  }
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
    width: drawerWidth,
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
    },
  }
});

export default compose(connect(
  state => ({
    Store: state
  })), withStyles(styles, { withTheme: true }))(Layout)