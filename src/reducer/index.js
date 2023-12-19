import AddTaskReducer from "./AddTaskReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers(
    {
        AddTaskReducer
    }
)

export default rootReducer;