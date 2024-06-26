import React from 'react'

interface DropDownFormProps {
  setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>;
  isList : boolean;
  boardId : string;
  listId : string;
}

const DropDownForm: React.FC<DropDownFormProps>= ({ setIsFormOpen, boardId, listId, isList  }) => {
  return (
    <div>DropDownForm</div>
  )
}

export default DropDownForm