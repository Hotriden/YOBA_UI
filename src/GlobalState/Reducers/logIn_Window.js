export const logIn_Window = (state = false, action) => {
    switch(action.type){
        case 'LogInOn':
            return !state;
        default:
            return state;
    }
  }