import React, {useRef, useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
import {useNavigate} from "react-router-dom";
import '../../styles/auth/Auth.css';

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const {login, toastMessage} = useContext(GlobalContext);
  const navigate = useNavigate();

  // const handleLogin = async (e)=>{
  //   e.preventDefault();
  //   if (!emailRef.current.value || !passwordRef.current.value) {
  //     toastMessage("Please enter all fields", "warning");
  //     return;
  //   }
  //   let res = await login(emailRef.current.value, passwordRef.current.value);
  //   if(res){
  //     navigate('/')
  //   }
  // }
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  
    // Check if email or password fields are empty
    if (!email || !password) {
      toastMessage("Please enter all fields", "warning");
      return;
    }
  
    try {
      // Attempt to log in
      const response = await login(email, password);
  
      // If login is successful, navigate to the home page
      if (response) {
        navigate('/');
      } else {
        // Handle login failure (e.g., incorrect credentials)
        toastMessage("Login failed. Please check your credentials and try again.", "error");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Login error:", error);
      toastMessage("An error occurred during login. Please try again later.", "error");
    }
  };
  
  return (
    <div className="loginform">
      <div className="formitem">
        <div className="label">Email</div>
        <input ref={emailRef} type="text" className="" />
      </div>
      <div className="formitem">
        <div className="label">Password</div>
        <input ref={passwordRef} type="password" className="" />
      </div>
      <button onClick={handleLogin} className="submit">Log In</button>
    </div>
  );
};

export default LoginForm;