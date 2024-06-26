import { useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiPlusCircle } from "react-icons/fi";
import SideForm from "./SideForm/SideForm";

interface BoardListProps {
    activeBoardId : string;
    setActiveBoardId : React.Dispatch<React.SetStateAction<string>>;
}

const BoardList:React.FC<BoardListProps> = ({activeBoardId, setActiveBoardId}) => {

    const boards = useTypedSelector(state=>state.boards.boardArray);
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div>
            <div>
                게시판 : 
            </div>
            {boards.map((board)=>{
                return (
                    <div>
                        <div key={board.boardId}>
                            {board.boardName}
                        </div>
                    </div>
                );
            })}
            <div>
                {
                    isFormOpen ?
                     <SideForm setIsFormOpen={setIsFormOpen}/>
                     :
                     <FiPlusCircle onClick={()=>setIsFormOpen(!isFormOpen)}/>
                }
            </div>
        </div>
    );
};

export default BoardList;