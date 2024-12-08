import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../Hooks";
import { loginFailure, loginReqest, loginSicces } from "../../../../Redux/Slices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase/firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import style from './ui.module.css';

export const Login: React.FC<{switchForm: () => void}> = ({switchForm}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    dispatch(loginReqest());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSicces(userCredential.user.email || ''));
      navigate('/');
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formBlock}>
        <h1>Login</h1>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faUser} className={style.icon} />
          <input 
            className={style.input} 
            type="email" 
            placeholder="Email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faKey} className={style.icon} />
          <input 
            className={style.input} 
            type="password" 
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className={style.btnWrapper}>
          <button 
            className={style.btn} 
            onClick={handleLogin} 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <p className={style.switchText}>
          Don't have an account? <span onClick={switchForm}>Sign up</span>
        </p>
        {error && (
          <p className={style.errorText}>Incorrect email or password</p>
        )}
      </div>
    </div>
  );
};