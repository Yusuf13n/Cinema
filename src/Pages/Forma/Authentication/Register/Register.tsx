import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../Hooks"
import { useNavigate } from "react-router-dom"
import { loginFailure, loginReqest, loginSicces } from "../../../../Redux/Slices/authSlice"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../FireBase/firebase.config"
import style from './ui.module.css'


export const Register: React.FC<{ switchForm: () => void }> = ({switchForm}) => {
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')


  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector((state) => state.auth)

  const navigate = useNavigate();


  const handleRegister = async () => {
    dispatch(loginReqest());
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(loginSicces(userCredential.user.email || ''))
      navigate('/')
    } catch (err: any) {
      dispatch(loginFailure(err.messege))
    }
  };


  return (
    <div className={style.mainContainerInput}>
        <div className={style.containerInput}>
            <div className={style.blockInput}>
                <div>
                    <h2 className={style.titleRegister}>Регистрация</h2>
                    <input
                    className={style.input}
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <div>
                        <input
                        className={style.input}
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.blockBtn}>
                    <button className={style.btn} onClick={handleRegister} disabled={loading}>
                        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                </div>
                <p>
                have an account <span onClick={switchForm}>Log in</span>
                </p>
                {error && (
                    <p className={style.errorRedister}> Ошибка при регистрации</p>
                )}
            </div>
        </div>
    </div>
  )
}
