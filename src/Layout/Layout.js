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
import { supplyListItems, salesListItems, financeListItems, staffListItems } from '../Components/listItems';
import ModalBox from '../Autentification/LoginModalBox/ModalBox';
import BodyComponent from './BodyComponent';
import RegistrationForm from '../Autentification/LoginModalBox/RegistrationForm';
import Cookies from 'universal-cookie';
import LogOut from '../Autentification/LoginModalBox/LogOut';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { SideBarSwitcher } from '../GlobalState/Actions/SideBarSwitcher';
import RemindPasswordForm from '../Autentification/LoginModalBox/RemindPasswordForm';

const cookies = new Cookies();

function Layout(props){
  const { classes } = props;
  const dispatch = useDispatch();

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
              YOBA - Your own business application. Welcome -  {cookies.get('_user') ? cookies.get('_user') : 'Guest'}
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
          <List>{supplyListItems}</List>
          <Divider />
          <List>{salesListItems}</List>
          <Divider />
          <List>{financeListItems}</List>
          <Divider />
          <List>{staffListItems}</List>
        </Drawer>
        { props.Store.RegistrationWindow ? <RegistrationForm /> : <RemindPasswordForm/> }
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
    },
  }
});

export default compose(connect(state => ({Store: state})), withStyles(styles, { withTheme: true }))(Layout)