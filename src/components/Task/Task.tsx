import React from 'react'
import { ITask } from '../../types'

interface TaskProps {
    task : ITask,
    boardId : string,
    index : number
}

const Task : React.FC<TaskProps> = ({task, boardId, index}) => {
  return (
    <div>Task</div>
  )
}

export default Task