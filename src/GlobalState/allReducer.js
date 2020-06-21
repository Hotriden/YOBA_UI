import { registration_Window } from './Reducers/registration_Window';
import { logIn_Window } from './Reducers/logIn_Window';
import { sideBar } from './Reducers/sideBar';
import { combineReducers } from 'redux';
import { remind_Window } from './Reducers/remind_Window';
import { load_Bar } from './Reducers/load_Bar';

export const allReducer = combineReducers({
    RegistrationWindow: registration_Window,
    LogInWindow: logIn_Window,
    SideBar: sideBar,
    RemindWindow: remind_Window,
    LoadBar: load_Bar
  });