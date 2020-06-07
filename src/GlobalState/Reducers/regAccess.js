export const regAccess = (state = false, action) => {
    switch(action.type){
        case 'RegAcess':
            return !state;
        default:
            return state;
    }
  }