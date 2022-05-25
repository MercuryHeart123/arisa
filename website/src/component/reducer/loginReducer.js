const loginReducer = (state = false, action) => {
    switch (action.type) {
        case 'login':
            state = {}
            state.username = action.data.username;
            state.admin = action.data.admin;
            return state;

        case 'logout':
            state = false;
            return state;
        default:
            return state;
    }

}

export default loginReducer;