export const remind_Window = (state = false, action) => {
    switch(action.type){
        case 'RemindOn':
            return !state;
        default:
            return state;
    }
  }