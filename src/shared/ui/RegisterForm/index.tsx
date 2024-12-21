import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { loginFailure, loginReqest, loginSicces } from "../../../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faAt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, message } from "antd";
import { auth } from "@/shared/consts/firebase/firebase.config";
import style from "./ui.module.css";

export const Register: React.FC<{ switchForm: () => void }> = ({ switchForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);

  const [messageApi, contextHolder] = message.useMessage();

  const openMessage = (type: "success" | "error", content: string) => {
    messageApi.open({
      type,
      content,
      duration: 2,
    });
  };

  const actualPage = useAppSelector((state) => state.pages.page || "/");

const handleRegister = async () => {
  dispatch(loginReqest());
  setLoading(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
    }

    dispatch(loginSicces({ email: userCredential.user.email || "", name }));
    openMessage("success", "Registration successful!");
    setTimeout(() => {
      navigate(actualPage); // Возвращаем на сохраненную страницу
    }, 2500);
  } catch (err: any) {
    dispatch(loginFailure(err.message));
    openMessage("error", "Error during registration. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={style.container}>
      <div className={style.formBlock}>
        <h1 className={style.titleRegister}>Sign up</h1>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faUser} className={style.icon} />
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className={style.btnWrapper}>
          {contextHolder}
          <Button
            type="primary"
            className={style.btn}
            loading={loading}
            onClick={handleRegister}
            disabled={loading}
          >
            Sign up
          </Button>
        </div>
        <p className={style.switchText}>
          Have an account? <span onClick={switchForm}>Log in</span>
        </p>
        {error && <p className={style.errorText}>Error during registration</p>}
      </div>
    </div>
  );
};