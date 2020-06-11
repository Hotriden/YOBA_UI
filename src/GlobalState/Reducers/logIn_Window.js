export const logIn_Window = (state = false, action) => {
    switch(action.type){
        case 'LogInOn':
            return true;
        case 'LogInOff':
            return false;
        default:
            return state;
    }
  }