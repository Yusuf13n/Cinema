import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  loginFailure,
  loginReqest,
  loginSicces,
} from "../../../redux/slices/authSlice";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth, googleProvider } from "@/shared/consts/firebase/firebase.config";
import {
  faKey,
  faAt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Button, message } from "antd";
import style from "./ui.module.css";

import iconGoogle from "../../assets/AuthenticationImage/Google.png";
import iconFacebook from "../../assets/AuthenticationImage/Facebook.png";
import { setPage } from "@/redux/slices/pageSlice";

export const Login: React.FC<{ switchForm: () => void }> = ({ switchForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);

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
    handleLogin();
  };

  const googleClick = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const actualPage = useAppSelector((state) => state.pages.page || "/");

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
      openMessage("success", "Login successful!");
      setTimeout(() => {
        navigate(actualPage);
        console.log(actualPage);
      }, 2000);
    } catch (err: any) {
      dispatch(loginFailure(err.message));
      openMessage("error", "Incorrect email or password. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(setPage(location.state?.from));
    console.log(location.state?.from);
    
  }, [location]);

  return (
    <div className={style.container}>
      <div className={style.formBlock}>
        <h1 className={style.titleLogin}>Log in</h1>
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
            className={style.btnLogin}
            loading={loadings[0]}
            onClick={hanleClickLoad}
            disabled={loading}
          >
            {loading ? "Login" : "Login"}
          </Button>
          <p className={style.paragraph}>Or login with</p>
          <div className={style.authIconBottom}>
            <button onClick={googleClick}>
              <img src={iconGoogle} alt="Icon Google" />
              Google
            </button>
            <button onClick={googleClick}>
              <img src={iconFacebook} alt="Icon Facebook" />
              Facebook
            </button>
          </div>
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
