export const load_Bar = (state = false, action) => {
    switch(action.type){
        case 'Load_On':
            return true;
        case 'Load_Off':
            return false;
        default:
            return state;
    }
  }