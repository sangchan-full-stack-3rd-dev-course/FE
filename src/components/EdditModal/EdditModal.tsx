import { ChangeEvent, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useTypedSelector } from '../../hooks/redux'
import { useDispatch } from 'react-redux'
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardSlice'
import { addLog } from '../../store/slices/loggerSlice'
import {v4 as uuidv4} from "uuid"
import { buttons, closeButton, deleteButton, header, input, modalWindow, title, updateButton, wrapper } from './EdditModal.css'

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
        <div className={wrapper}>
            <div className={modalWindow}>
                <div className={header}>
                    <div className={title}>{data.task.taskName}</div>
                    <FiX className={closeButton} onClick={handleCloseButton}/>
                </div>
                <div className={title}>제목</div>
                <input
                    className={input}
                    type="text"
                    value={data.task.taskName}
                    onChange={handleNameChange}
                />
                <div className={title}>설명</div>
                <input
                    className={input}
                    type="text"
                    value={data.task.taskDescription}
                    onChange={handleDescriptionChange}
                />
                <div className={title}>생성한 사람</div>
                <input
                    className={input}
                    type="text"
                    value={data.task.taskOwner}
                    onChange={handleAuthorChange}
                />
                <div className={buttons}>
                    <button className={updateButton} onClick={handleUpdate}>일 수정하기</button>
                    <button className={deleteButton} onClick={handleDelete}>일 삭제하기</button>
                </div>
            </div>
        </div>
    )
}

export default EdditModal