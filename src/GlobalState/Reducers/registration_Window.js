export const registration_Window = (state = false, action) => {
    switch(action.type){
        case 'SwitchOn':
            return true;
        case 'SwitchOff':
            return false;
        default:
            return state;
    }
  }