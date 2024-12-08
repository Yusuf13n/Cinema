// import { useNavigate } from "react-router-dom";
import { AvatarHome } from './Avatar/AvatarHome'
import { FilmsCard } from './Films/FilmsCard'


interface handleOpenProps {
  handleOpen: () => void
}

export const Home = ({handleOpen}: handleOpenProps) => {
  

  return (
    <div>
      <AvatarHome/>
      <FilmsCard  handleOpen={handleOpen} />
    </div>
  )
}
