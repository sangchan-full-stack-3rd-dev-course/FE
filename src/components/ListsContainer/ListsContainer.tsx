import React from 'react'
import { IList } from '../../types'
import List from '../List/List'
import ActionButton from '../ActionButton/ActionButton'
import { listsContainer } from './ListsContainer.css'

interface ListsContainerProps {
    lists : IList[],
    boardId : string
}

const ListsContainer: React.FC<ListsContainerProps> = ({lists, boardId}) => {

    const renderLists = () => {
        return lists.map(list => {
                return <List key={list.listId} list={list} boardId={boardId}/>
        })
    }

    return (
        <div className={listsContainer}>
            {renderLists()}
            <ActionButton boardId={boardId} listId={""} isList={true}/>
        </div>
    )
}

export default ListsContainer