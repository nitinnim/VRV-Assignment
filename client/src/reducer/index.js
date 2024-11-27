import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import adminReducer from '../slices/adminSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
});

export default rootReducer;
