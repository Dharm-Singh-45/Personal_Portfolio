import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./slices/userSlice.js";
import forgotResetPassReducer from './slices/forgotPasswordSlice.js'
import messagesReducer from './slices/messagesSlice.js'
import timelineReducer from './slices/timelineSlice.js'
import skillReducers from './slices/skillSlice.js'
import softwareApplicationReducer from './slices/softwareApplicationSlice.js'
import projectReducer from './slices/projectSlice.js'

export const store = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword:forgotResetPassReducer,
        messages: messagesReducer,
        timeline:timelineReducer,
        skill:skillReducers,
        application:softwareApplicationReducer,
        project:projectReducer
    }
})


export default store