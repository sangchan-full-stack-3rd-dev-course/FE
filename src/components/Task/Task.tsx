import React from 'react'
import { ITask } from '../../types'
import { container, description, title } from './Task.css'
import { Draggable } from 'react-beautiful-dnd'

interface TaskProps {
    task : ITask,
    boardId : string,
    index : number
}

const Task : React.FC<TaskProps> = ({task, boardId, index}) => {
  return (
    <Draggable draggableId={task.taskId} index={index}>
      {provided => (
        <div
          ref = {provided.innerRef}
          className={container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={title}>{task.taskName}</div>
          <div className={description}>{task.taskDescription}</div>
        </div>
      )}
    </Draggable>
  )
}

export default Task