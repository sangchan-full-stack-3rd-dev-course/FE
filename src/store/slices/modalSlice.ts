import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

type TModalState = {
    boardId : string,
    listId : string,
    task : ITask
}

const initialState : TModalState = {
    boardId : "board-0",
    listId : "list-0",
    task : {
        taskId : "task-0",
        taskName : "task 0",
        taskDescription : "task 0 description",
        taskOwner : "Me"
    }
}

const modalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers : {}
});

export const modalReducer = modalSlice.reducer;