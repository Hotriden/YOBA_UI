export const sideBar = (state = true, action) => {
    switch(action.type){
        case 'SideBarOn':
            return !state;
        default:
            return state;
    }
  }