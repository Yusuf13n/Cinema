import { useState } from 'react'
import style from './ui.module.css'
import { Register } from '@/shared/ui/RegisterForm';
import { Login } from '@/shared/ui/LoginForm';


export const AuthenticationPage = () => {
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
