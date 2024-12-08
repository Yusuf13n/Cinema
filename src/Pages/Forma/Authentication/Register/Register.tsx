import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Hooks";
import { useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginReqest,
  loginSicces,
} from "../../../../Redux/Slices/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase/firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import style from "./ui.module.css";

export const Register: React.FC<{ switchForm: () => void }> = ({
  switchForm,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleRegister = async () => {
    dispatch(loginReqest());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(loginSicces(userCredential.user.email || ""));
      navigate("/");
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formBlock}>
        <h1 className={style.titleRegister}>Sign in</h1>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faUser} className={style.icon} />
          <input
            className={style.input}
            type="text"
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
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Регистрация..." : "Sign in"}
          </button>
        </div>
        <p className={style.switchText}>
          Have an account? <span onClick={switchForm}>Log in</span>
        </p>
        {error && <p className={style.errorText}>Error during registration</p>}
      </div>
    </div>
  );
};
