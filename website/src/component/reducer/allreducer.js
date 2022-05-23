import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const allReducer = combineReducers({
    username: loginReducer,
});
export default allReducer;