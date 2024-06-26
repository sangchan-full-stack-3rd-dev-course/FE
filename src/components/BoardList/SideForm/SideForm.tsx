interface SideFormProps {
  setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const SideForm:React.FC<SideFormProps> = ({setIsFormOpen}) => {
  return (
    <div onClick={()=>setIsFormOpen}>SideForm</div>
  )
}

export default SideForm