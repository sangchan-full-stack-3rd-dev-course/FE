import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
    modalActive: boolean;
    boardArray : IBoard[];
}

type TAddBoardAction = {
    board : IBoard;
}

type TDeleteBoardAction = {
    boardId : string;
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

type TDeleteTaskAction = {
    boardId : string;
    listId : string;
    taskId : string;
}

type TDeleteListAction = {
    boardId : string;
    listId : string;
}

type TSortAction = {
    boardIndex : number;
    droppableIdStart : string;
    droppableIdEnd : string;
    droppableIndexStart : number;
    droppableIndexEnd : number;
    draggableId : string;
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
        deleteBoard : (state, action : PayloadAction<TDeleteBoardAction>) => {
            state.boardArray = state.boardArray.filter(board => board.boardId !== action.payload.boardId)
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
        updateTask : (state, action : PayloadAction<TAddTaskAction>) => {
                state.boardArray = state.boardArray.map(board => board.boardId === action.payload.boardId ?
                    {
                        ...board,
                        lists : board.lists.map(list=>list.listId === action.payload.listId
                        ?
                            {
                            ...list,
                                tasks : list.tasks.map(task=>task.taskId === action.payload.task.taskId
                                ?
                                    action.payload.task
                                    :
                                    task
                                )
                            }
                            :
                            list
                        )
                    } 
                    :
                    board
                )
        },
        deleteTask : (state, action : PayloadAction<TDeleteTaskAction>) =>{
            state.boardArray = state.boardArray.map(board => board.boardId === action.payload.boardId ?
                {
                    ...board,
                    lists : board.lists.map(list=>list.listId === action.payload.listId
                    ?
                        {
                            ...list,
                            tasks : list.tasks.filter(task=>task.taskId !== action.payload.taskId)
                        }
                        :
                        list
                    )
                } 
                :
                board
            )
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
        },
        sort : (state, action : PayloadAction<TSortAction>) => {

        }
    }
});

export const {addBoard, deleteBoard, addList, addTask, updateTask, deleteTask, deleteList, setModalActive, sort} = boardSlice.actions;
export const boardReducer = boardSlice.reducer;

