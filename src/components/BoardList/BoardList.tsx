import { useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiPlusCircle } from "react-icons/fi";
import SideForm from "./SideForm/SideForm";
import { addButton, addSection, boardItem, boardItemActive, container, title } from "./BoardList.css";
import clsx from "clsx";

interface BoardListProps {
    activeBoardId : string;
    setActiveBoardId : React.Dispatch<React.SetStateAction<string>>;
}

const BoardList:React.FC<BoardListProps> = ({activeBoardId, setActiveBoardId}) => {

    const boards = useTypedSelector(state=>state.boards.boardArray);
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className={container}>
            <div className={title}>
                게시판 : 
            </div>
            {boards.map((board, index)=>{
                return (
                    <div key={board.boardId}
                        onClick={()=> setActiveBoardId(boards[index].boardId)}
                        className={
                            clsx(
                                {
                                    [boardItemActive] :
                                    boards.findIndex(board => board.boardId === activeBoardId) === index
                                }, 
                                {
                                    [boardItem] :
                                    boards.findIndex(board => board.boardId === activeBoardId)!== index
                                }
                            )
                    }>
                        <div>
                            {board.boardName}
                        </div>
                    </div>
                );
            })}
            <div className={addSection}>
                {
                    isFormOpen ?
                     <SideForm setIsFormOpen={setIsFormOpen}/>
                     :
                     <FiPlusCircle className={addButton} onClick={()=>setIsFormOpen(!isFormOpen)}/>
                }
            </div>
        </div>
    );
};

export default BoardList;