export const registration_Window = (state = false, action) => {
    switch(action.type){
        case 'SwitchOn':
            return !state;
        default:
            return state;
    }
  }