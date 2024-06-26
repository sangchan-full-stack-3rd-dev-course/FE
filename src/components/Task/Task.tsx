import React from 'react'
import { ITask } from '../../types'
import { container, description, title } from './Task.css'

interface TaskProps {
    task : ITask,
    boardId : string,
    index : number
}

const Task : React.FC<TaskProps> = ({task, boardId, index}) => {
  return (
    <div className={container}>
      <div className={title}>{task.taskName}</div>
      <div className={description}>{task.taskDescription}</div>
    </div>
  )
}

export default Task