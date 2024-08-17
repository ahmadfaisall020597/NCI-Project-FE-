import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "../../components/Dashboard/dashboardSlice";

const rootReducer = combineReducers({
    dashboard: dashboardSlice
});

export default rootReducer;