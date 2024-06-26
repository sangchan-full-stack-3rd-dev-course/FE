import React, { ChangeEvent, useState } from 'react'
import { FiX } from 'react-icons/fi';
import { addList, addTask } from '../../../store/slices/boardSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
import { useDispatch } from 'react-redux';
import { button, buttons, close, input, listForm, taskForm } from './DropDownForm.css';

interface DropDownFormProps {
  setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>;
  isList? : boolean;
  boardId : string;
  listId : string;
}

const DropDownForm: React.FC<DropDownFormProps>= ({
  setIsFormOpen, 
  boardId, 
  listId, 
  isList
}) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const formPlaceholder : string = isList ?
    "리스트의 제목을 입력하세요.": "일의 제목을 입력하세요";
  const buttonTitle : string = isList ?
    "리스트 추가하기" : "일 추가하기";

  const handleTextChange = (e : ChangeEvent<HTMLTextAreaElement>)=>{
    setText(e.target.value);
  }

  const handleButtonClick = () => {
    if(!text){
      setIsFormOpen(false);
      return;
    }

    if(isList){
      dispatch(addList({
        boardId,
        list : {
          listId : uuidv4(),
          listName : text,
          tasks : []
        }
      }))
    } else {
      dispatch(addTask({
        boardId,
        listId,
        task : {
          taskId : uuidv4(),
          taskName : text,
          taskDescription : "",
          taskOwner : "User"
        }
      }))
    }

    console.log(text)

    dispatch(addLog({
      logId : uuidv4(),
      logMessage : `${isList? "리스트" : "일"} 생성하기`,
      logAuthor : "User",
      logTimeStamp : String(Date.now())
    }));

    setIsFormOpen(false);
  }

  return (
    <div className={isList ? listForm : taskForm}>
      <textarea
        className={input}
        autoFocus
        value ={text}
        placeholder={formPlaceholder}
        onChange={handleTextChange}
        // onBlur={()=>setIsFormOpen(false)}
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiX className={close}/>
      </div>
    </div>
  )
}

export default DropDownForm