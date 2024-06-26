import { useState } from "react";

interface SideFormProps {
  setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>;
  inputRef : React.RefObject<HTMLInputElement>;
}

const SideForm:React.FC<SideFormProps> = ({setIsFormOpen, inputRef}) => {

  const [inputText, setInputText] = useState('');

  return (
    <div>
      <input
        // ref={inputRef}
        autoFocus
        type='text'
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={e=>setInputText(e.target.value)}
        onBlur={()=>setIsFormOpen(false)}
      ></input>
    </div>
  )
}

export default SideForm