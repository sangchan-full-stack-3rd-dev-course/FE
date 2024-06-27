import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useTypedSelector } from '../../hooks/redux'
import { useDispatch } from 'react-redux'
import { setModalActive } from '../../store/slices/boardSlice'

const EdditModal = () => {
    const dispatch = useDispatch();
    const edditingState = useTypedSelector(state => state.modal);
    const [data ,setData] = useState(edditingState);

    const handleCloseButton = () => {
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
                <input type="text" value={data.task.taskName}/>
                <div>설명</div>
                <input type="text" value={data.task.taskDescription}/>
                <div>생성한 사람</div>
                <input type="text" value={data.task.taskOwner}/>
                <div>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default EdditModal