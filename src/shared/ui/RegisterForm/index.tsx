import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { User, updateProfile, signInWithPopup } from "firebase/auth";
import { loginFailure, loginReqest, loginSicces } from "../../../redux/slices/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faAt } from "@fortawesome/free-solid-svg-icons";
import { auth, googleProvider } from "@/shared/consts/firebase/firebase.config";
import { Button, message } from "antd";

import style from "./ui.module.css";

export const Register: React.FC<{ switchForm: () => void }> = ({ switchForm }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const openMessage = (type: "success" | "error", content: string) => {
    messageApi.open({
      key,
      type,
      content,
      duration: 2,
    });
  };

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  const hanleClickLoad = () => {
    enterLoading(0);
    handleRegister();
  };

  const handleRegister = async () => {
    dispatch(loginReqest());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      dispatch(
        loginSicces({ email: userCredential.user.email || "", name: name })
      );
      openMessage("success", "Registration successful!");
      setTimeout(() => {
      }, 2500);
    } catch (err: any) {
      dispatch(loginFailure(err.message));
      openMessage("error", "Error during registration. Please try again.");
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
          {contextHolder}
          <Button
            type="primary"
            className={style.btn}
            loading={loadings[0]}
            onClick={hanleClickLoad}
            disabled={loading}
          >
            {loading ? "Sign up" : "Sign in"}
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
