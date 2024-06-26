import { useState } from "react";
import DropDownForm from "./DropDownForm/DropDownForm";
import { IoIosAdd } from "react-icons/io";
import { listButton, taskButton } from "./ActionButton.css";

interface ActionButtonProps {
    boardId : string;
    listId : string;
    isList? : boolean;
}

const ActionButton : React.FC<ActionButtonProps> = ({boardId, listId, isList}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const buttonText = isList ? `새로운 리스트 등록` : `새로운 일 등록`;

    return isFormOpen ? (
        <DropDownForm
            setIsFormOpen={setIsFormOpen}
            isList={isList ? true : false}
            boardId={boardId}
            listId={listId}
        />
    )
    :
    (
        <div className={isList ? listButton : taskButton}
            onClick={()=>setIsFormOpen(true)}>
            <IoIosAdd/>
            <p>{buttonText}</p>
        </div>
        
    )
    ;
}


export default ActionButton;