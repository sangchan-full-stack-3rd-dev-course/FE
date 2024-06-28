import { useState } from 'react'
import './App.css'
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css.ts'
import BoardList from './components/BoardList/BoardList.tsx'
import ListsContainer from './components/ListsContainer/ListsContainer.tsx';
import { useTypedSelector } from './hooks/redux.ts';
import EdditModal from './components/EdditModal/EdditModal.tsx';
import LoggerModal from './components/LoggerModal/LoggerModal.tsx';
import { useDispatch } from 'react-redux';
import { deleteBoard, sort } from './store/slices/boardSlice.ts';
import { addLog } from './store/slices/loggerSlice.ts';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  const dispatch = useDispatch();
  const [isLoggerOpen, setisLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const modalActive = useTypedSelector(state => state.boards.modalActive);
  const boards = useTypedSelector(state=>state.boards.boardArray);
  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;

  const handleDeleteBoard = () => {
    if (boards.length <= 1) {
      alert('최소 게시판 개수는 한 개 입니다.');
      return;
    }

    dispatch(deleteBoard({boardId : getActiveBoard.boardId}));
    dispatch(addLog({
      logId : uuidv4(),
      logMessage : `게시판 지우기 : ${getActiveBoard.boardName}`,
      logAuthor : "User",
      logTimeStamp : String(Date.now())
    }))

    const newIndexToSet = () => {
      const indexToBeDelete = boards.findIndex(
        board => board.boardId === activeBoardId
      );

      return indexToBeDelete === 0 ? indexToBeDelete + 1 : indexToBeDelete - 1;
    }

    setActiveBoardId(boards[newIndexToSet()].boardId);
  };

  const handleDragEnd = (result : any) => {
    const { destination, source, draggableId } = result;

    const sourceList = lists.filter(
      list => list.listId === source.droppableId
    )[0];

    dispatch(sort({
      boardIndex : boards.findIndex(board => board.boardId === activeBoardId),
      droppableIdStart : source.droppableId,
      droppableIdEnd : destination.droppableId,
      droppableIndexStart : source.index,
      droppableIndexEnd : destination.index,
      draggableId : draggableId
    }))

    dispatch(addLog({
      logId : uuidv4(),
      logMessage : `
        리스트 ${sourceList.listName} 에서
        리스트 ${lists.filter(list => list.listId === destination.droppableId)[0].listName} 으로
        ${sourceList.tasks.filter(task=>task.taskId === draggableId)[0].taskName} 를 옮김.`,
      logAuthor : "User",
      logTimeStamp : String(Date.now())
    }))
  }

  return (
    <>
      <div className={appContainer}>
        {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setisLoggerOpen}/> : null}
        {modalActive ? <EdditModal/>: null}
        <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId}/>
        <div className={board}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <ListsContainer lists={lists} boardId={getActiveBoard.boardId}/>
          </DragDropContext>
        </div>
        <div className={buttons}>
          <button className={deleteBoardButton} onClick={handleDeleteBoard}>이 게시판 삭제하기</button>
          <button className={loggerButton} onClick={()=>setisLoggerOpen(!isLoggerOpen)}>
            {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
