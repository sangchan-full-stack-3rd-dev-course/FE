import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

const store = configureStore({
    reducer : reducer,
    devTools : true,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : {
            ignoredActions : ['logger/log']
        }
    })
});

export default store;