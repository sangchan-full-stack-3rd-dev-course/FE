import { useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import SideForm from "./SideForm/SideForm";
import { addButton, addSection, boardItem, boardItemActive, container, title } from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

interface BoardListProps {
    activeBoardId : string;
    setActiveBoardId : React.Dispatch<React.SetStateAction<string>>;
}

const BoardList:React.FC<BoardListProps> = ({activeBoardId, setActiveBoardId}) => {

    const dispatch = useDispatch();
    const boards = useTypedSelector(state=>state.boards.boardArray);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const renderBoards = () => {
        return boards.map((board, index)=>{
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
        })
    };

    const handleClick = () =>{
        setIsFormOpen(!isFormOpen);
        setTimeout(() =>{
            inputRef.current?.focus();
        }, 0);
    };

    const handleLogIn = () => {
        signInWithPopup(auth, provider).then(userCredential => {
            dispatch(setUser({
                email : userCredential.user.email!,
                id : userCredential.user.uid,
            }))            
        }).catch(error => {
            console.error(error);
        });
    }

    const handleLogOut = () => {
        signOut(auth).then(()=>{
            dispatch(removeUser()); 
        }).catch(error => console.error(error));
    }

    return (
        <div className={container}>
            <div className={title}>
                게시판 : 
            </div>
            {renderBoards()}
            <div className={addSection}>
                {
                    isFormOpen ?
                     <SideForm setIsFormOpen={setIsFormOpen}/>
                     :
                     <FiPlusCircle className={addButton} onClick={handleClick}/>
                }
                {
                    useAuth().isAuth ? 
                    <GoSignOut className={addButton} onClick={handleLogOut}/>
                    :
                    <FiLogIn className={addButton} onClick={handleLogIn}/>
                }
            </div>
        </div>
    );
};

export default BoardList;