import React, { useState } from "react";
import Register from "./Register";
import LoginPage from "./Login";

interface Props {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login = ({ openLogin,setOpenLogin }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? (
        <LoginPage
          isLogin={isLogin}
          openLogin={openLogin}
          setIsLogin={setIsLogin}
          setOpenLogin={setOpenLogin}
        />
      ) : (
        <Register
          isLogin={isLogin}
          openLogin={openLogin}
          setIsLogin={setIsLogin}
          setOpenLogin={setOpenLogin}
        />
      )}
    </>
  );
};

export default Login;
