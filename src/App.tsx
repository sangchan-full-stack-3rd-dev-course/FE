import './App.css'
import { appContainer, board, buttons } from './App.css.ts'

function App() {
  return (
    <>
      <div className={appContainer}>
        <div className={board}></div>
        <div className={buttons}>
          <button>이 게시판 삭제하기</button>
          <button></button>
        </div>
      </div>
    </>
  )
}

export default App
