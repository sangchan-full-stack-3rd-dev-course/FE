import React, { ChangeEvent, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useTypedSelector } from '../../hooks/redux'
import { useDispatch } from 'react-redux'
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardSlice'
import { addLog } from '../../store/slices/loggerSlice'
import {v4 as uuidv4} from "uuid"

const EdditModal = () => {
    const dispatch = useDispatch();
    const edditingState = useTypedSelector(state => state.modal);
    const [data ,setData] = useState(edditingState);

    const handleCloseButton = () => {
        dispatch(setModalActive(false));
    }

    const handleNameChange = (e : ChangeEvent<HTMLInputElement>) => {
        setData({...data, task: {...data.task, taskName: e.target.value}});
    }

    const handleDescriptionChange = (e : ChangeEvent<HTMLInputElement>) => {
        setData({...data, task: {...data.task, taskDescription: e.target.value}});
    }

    const handleAuthorChange = (e : ChangeEvent<HTMLInputElement>) => {
        setData({...data, task: {...data.task, taskOwner: e.target.value}});
    }

    const handleUpdate = () => {
        dispatch(updateTask(
            {
                boardId: data.boardId,
                listId: data.listId,
                task: data.task
            }
        ))

        dispatch(addLog({
            logId : uuidv4(),
            logMessage : `일 수정하기 : ${data.task.taskName}`,
            logAuthor : "User",
            logTimeStamp : String(Date.now())
        }))

        dispatch(setModalActive(false));
    }

    const handleDelete = () => {
        dispatch(deleteTask(
            {
                boardId: data.boardId,
                listId: data.listId,
                taskId: data.task.taskId
            }
        ))

        dispatch(addLog({
            logId : uuidv4(),
            logMessage : `일 삭제하기 : ${data.task.taskName}`,
            logAuthor : "User",
            logTimeStamp : String(Date.now())
        }))

        dispatch(setModalActive(false));
    }

    return (
        <div>
            <div>
                <div>
                    <div>{data.task.taskName}</div>
                    <FiX onClick={handleCloseButton}/>
                </div>
                <div>제목</div>
                <input
                    type="text"
                    value={data.task.taskName}
                    onChange={handleNameChange}
                />
                <div>설명</div>
                <input
                    type="text"
                    value={data.task.taskDescription}
                    onChange={handleDescriptionChange}
                />
                <div>생성한 사람</div>
                <input
                    type="text"
                    value={data.task.taskOwner}
                    onChange={handleAuthorChange}
                />
                <div>
                    <button onClick={handleUpdate}>일 수정하기</button>
                    <button onClick={handleDelete}>일 삭제하기</button>
                </div>
            </div>
        </div>
    )
}

export default EdditModal