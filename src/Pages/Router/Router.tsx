import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Forma } from '../Forma/Forma'
import { FilmDetail } from '../FilmDetail/FilmsDetail'

export const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/Auth" element={<Forma />} />
    </Routes>
  )
}
