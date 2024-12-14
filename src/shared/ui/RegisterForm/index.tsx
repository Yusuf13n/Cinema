import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { User, updateProfile } from 'firebase/auth';  // Импортируем updateProfile
import {
  loginFailure,
  loginReqest,
  loginSicces,
} from "../../../redux/slices/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faAt } from "@fortawesome/free-solid-svg-icons";
import style from "./ui.module.css";
import { auth } from "@/shared/consts/firebase/firebase.config";

export const Register: React.FC<{ switchForm: () => void }> = ({
  switchForm,
}) => {
  const [name, setName] = useState<string>("");
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

      if (userCredential.user) {
        // Используем updateProfile из firebase/auth
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      dispatch(loginSicces({email: userCredential.user.email || "", name: name}));
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
          <FontAwesomeIcon icon={faUser} className={style.icon}/>
          <input
            className={style.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faAt} className={style.icon} />
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
            {loading ? "Sign up..." : "Sign in"}
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
