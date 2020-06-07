import { registration_Window } from './Reducers/registration_Window';
import { logIn_Window } from './Reducers/logIn_Window';
import { sideBar } from './Reducers/sideBar';
import { combineReducers } from 'redux';
import { regAccess } from './Reducers/regAccess';

export const allReducer = combineReducers({
    RegistrationWindow: registration_Window,
    LogInWindow: logIn_Window,
    SideBar: sideBar,
    RegAccess: regAccess
  });