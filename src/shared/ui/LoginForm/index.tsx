import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { loginFailure, loginReqest, loginSicces } from "../../../redux/slices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "@/shared/consts/firebase/firebase.config";
import { faKey, faAt } from "@fortawesome/free-solid-svg-icons";

import style from "./ui.module.css";
import { Button, message } from "antd";

export const Login: React.FC<{ switchForm: () => void }> = ({ switchForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Loaded!",
        duration: 2,
      });
    }, 2000);
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
    handleLogin();
    openMessage();
  };

  const { loading, error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    dispatch(loginReqest());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        loginSicces({
          email: userCredential.user.email,
        })
      );
      // navigate("/");
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formBlock}>
        <h1>Login</h1>
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
            {loading ? "Login..." : "Login"}
          </Button>
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
