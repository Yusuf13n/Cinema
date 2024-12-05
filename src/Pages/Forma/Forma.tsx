import { useState } from 'react'
import { Login } from './Authentication/Login/Login'
import style from './Forma.module.css'
import { Register } from './Authentication/Register/Register';


export const Forma = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const switchForm = () => {
    setIsLogin(!isLogin)
  };


  return (
    <div className={style.containerForm}>
      {isLogin ? (
        <Login switchForm={switchForm}/>
      ) : (
        <Register switchForm={switchForm} />
      )}
    </div>
  )
}
