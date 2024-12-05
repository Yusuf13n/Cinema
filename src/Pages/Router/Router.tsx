import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Forma } from '../Forma/Forma'

export const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Forma />} />
    </Routes>
  )
}
