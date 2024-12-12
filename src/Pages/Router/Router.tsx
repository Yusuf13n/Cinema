import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Forma } from '../Forma/Forma'
import { FilmDetail } from '../FilmDetail/FilmsDetail'
import { Modal } from '../../components/Modal/Modal'
import { useState } from 'react'

export const Router = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedFilmTitle, setSelectedFilmTitle] = useState<string>("");

  const handleOpen = (title: string) => {
    setSelectedFilmTitle(title);
      setIsOpen(true)
  }

  const handleClose = () => {
      setIsOpen(false)
  }
  return (
    <Routes>
        <Route path="/" element={
          <> 
          {isOpen && <Modal handleClose={handleClose} title={selectedFilmTitle} />} 
          <Home handleOpen={handleOpen}/>
          </>
        }
        />
        <Route path="/film/:id" element={<FilmDetail  />} />
        <Route path="/Auth" element={<Forma />} />
    </Routes>
  )
}
