import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
    modalActive: boolean;
    boardArray : IBoard[];
}

type TAddBoardAction = {
    board : IBoard;
}

type TAddListAction = {
    boardId : string;
    list : IList;
}

type TAddTaskAction = {
    boardId : string;
    listId : string;
    task : ITask;
}

type TDeleteListAction = {
    boardId : string;
    listId : string;
}

const initialState : TBoardState = {
    modalActive : false,
    boardArray : [
        {
            boardId : "board-0",
            boardName : "첫 번째 게시물",
            lists : [
                {
                    listId : "list-0",
                    listName : "List 1",
                    tasks: [
                        {
                            taskId : "task-0",
                            taskName : "Task 1",
                            taskDescription : "task 1 description",
                            taskOwner : "John"
                        },
                        {
                            taskId : "task-1",
                            taskName : "Task 2",
                            taskDescription : "task 2 description",
                            taskOwner : "John"
                        },
                    ]
                },
                {
                    listId : "list-1",
                    listName : "List 2",
                    tasks: [
                        {
                            taskId : "task-2",
                            taskName : "Task 3",
                            taskDescription : "task 3 description",
                            taskOwner : "Park"
                        }
                    ]
                }
            ]
        }
    ]
}

const boardSlice = createSlice({
    name : 'boards',
    initialState,
    reducers : {
        addBoard : (state, action : PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(action.payload.board);
        },
        addList : (state, action : PayloadAction<TAddListAction>) => {
            state.boardArray.map(board => board.boardId === action.payload.boardId 
                ? 
                {...board, lists:board.lists.push(action.payload.list) } 
                : 
                board
            );
        },
        addTask : (state, action : PayloadAction<TAddTaskAction>) => {
            state.boardArray.map(board => board.boardId === action.payload.boardId
                ?
                {
                    ...board,
                    lists : board.lists.map(list=>list.listId === action.payload.listId
                        ?
                        {
                           ...list,
                            tasks : list.tasks.push(action.payload.task)
                        }
                        :
                        list
                    )
                }
                :
                board
            );
        },
        deleteList : (state, action : PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map(board => board.boardId ? 
                {
                    ...board,
                    lists : board.lists.filter(
                        list => list.listId !== action.payload.listId
                    )
                }
                :
                board
            );
        },
        setModalActive : (state, action : PayloadAction<boolean>) => {
            state.modalActive = action.payload;
        }
    }
});

export const {addBoard, addList, addTask, deleteList, setModalActive} = boardSlice.actions;
export const boardReducer = boardSlice.reducer;

