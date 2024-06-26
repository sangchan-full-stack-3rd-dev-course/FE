import { useState } from "react";
import { icon, input, sideForm } from "./SideForm.css";
import { FiCheck } from "react-icons/fi";
//import { useTypedDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardSlice";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addLog } from "../../../store/slices/loggerSlice";

interface SideFormProps {
  setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>;
  inputRef : React.RefObject<HTMLInputElement>;
}

const SideForm:React.FC<SideFormProps> = ({setIsFormOpen, inputRef}) => {

  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const handleClick = () => {
    if(inputText){
      dispatch(
        addBoard({
          board : {
            boardId : uuidv4(),
            boardName : inputText,
            lists : []
          }
        })
      );

      dispatch(
        addLog({
          logId :uuidv4(),
          logMessage : `게시판 등록: ${inputText}`,
          logAuthor : "User",
          logTimeStamp : String(Date.now())
        })
      )
    }
    setIsFormOpen(false)
  };

  return (
    <div className={sideForm}>
      <input
        // ref={inputRef}
        autoFocus
        type='text'
        className={input}
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
      />
      <FiCheck className={icon} onClick={handleClick}/>
    </div>
  )
}

export default SideForm