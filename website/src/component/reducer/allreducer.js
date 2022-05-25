import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const allReducer = combineReducers({
    user: loginReducer,
});
export default allReducer;