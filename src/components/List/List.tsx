import React from 'react'
import { GrSubtract } from 'react-icons/gr'
import { IList, ITask } from '../../types'
import Task from '../Task/Task'
import ActionButton from '../ActionButton/ActionButton'
import { useDispatch } from 'react-redux'
import { deleteList, setModalActive } from '../../store/slices/boardSlice'
import { addLog } from '../../store/slices/loggerSlice'
import { v4 as uuidv4 } from 'uuid';
import { setModalData } from '../../store/slices/modalSlice'
import { deleteButton, header, listWrapper, name } from './List.css'

interface ListProps {
    list : IList,
    boardId : string
}

const List: React.FC<ListProps> = ({list, boardId}) => {

    const dispatch = useDispatch();

    const handleListDelete = (listId:string) => {
        dispatch(deleteList({boardId, listId}));
        dispatch(addLog({
            logId : uuidv4(),
            logMessage : `리스트 삭제: ${list.listName}`,
            logAuthor : "User",
            logTimeStamp : String(Date.now())
        }));
    };

    const handleTaskChange = (
        boardId : string, 
        listId : string, 
        task : ITask
    ) => {
            dispatch(setModalData({boardId, listId, task}));
            dispatch(setModalActive(true));
    };

    const renderList = () => {
        return list.tasks.map((task, index)=>{
            return <div key={task.taskId} onClick={()=>handleTaskChange(boardId, list.listId, task)}>
                <Task index={index} boardId={boardId} task={task}/>
            </div>;
        })
    }

    return (
        <div className={listWrapper}>
            <div className={header}>
                <div className={name}>{list.listName}</div>
                <GrSubtract className={deleteButton} onClick={()=> handleListDelete(list.listId)}/>
            </div>
            {renderList()}
            <ActionButton boardId={boardId} listId={list.listId} isList={false}/>
        </div>
    )
}

export default List