import { createSlice } from "@reduxjs/toolkit";
import { ILogItem } from "../../types";

type loggerState = {
    logArray : ILogItem[]
}

const initialState : loggerState = {
    logArray : []
}

const loggerSlice = createSlice({
    name : 'logger',
    initialState,
    reducers : {}
});

export const loggerReducer = loggerSlice.reducer;