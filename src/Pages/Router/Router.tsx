import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Forma } from '../Forma/Forma'
import { FilmDetail } from '../FilmDetail/FilmsDetail'
import { Modal } from '../../components/Modal/Modal'
import { useState } from 'react'
import { useAppSelector } from '../../Hooks'
// import { Register } from '../Forma/Authentication/Register/Register'

export const Router = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // const user = useAppSelector((state) => state.auth.user) 
  // const navigate = useNavigate();

  const handleOpen = () => {
    // if(user) {
      setIsOpen(true)
    // } else {
      // navigate('/register')
    // }
  }

  const handleClose = () => {
      setIsOpen(false)
  }
  return (
    <Routes>
        <Route path="/" element={
          <> 
          {isOpen && <Modal handleClose={handleClose} />} 
          <Home handleOpen={handleOpen}/>
          </>
        }
        />
        <Route path="/film/:id" element={<FilmDetail  />} />
        <Route path="/Auth" element={<Forma />} />
        {/* <Route path='/register' element={<Register switchForm={function (): void {
        throw new Error('Function not implemented.') */}
      {/* } } />}/> */}
    </Routes>
  )
}
