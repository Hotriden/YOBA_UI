export const remind_Window = (state = false, action) => {
    switch(action.type){
        case 'RemindOn':
            return true;
        case 'RemindOff':
            return false;
        default:
            return state;
    }
  }