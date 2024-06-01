import React, { useRef, useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const SignupForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const cnfpasswordRef = useRef();
  const { setWp } = props;
  const { signup, toastMessage } = useContext(GlobalContext);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    cnfpassword: false,
  });

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cnfpassword = cnfpasswordRef.current.value;

    let hasError = false;
    let newErrors = {
      name: false,
      email: false,
      password: false,
      cnfpassword: false,
    };

    if (!name) {
      newErrors.name = true;
      hasError = true;
    }

    if (!email) {
      newErrors.email = true;
      hasError = true;
    }

    if (!password) {
      newErrors.password = true;
      hasError = true;
    }

    if (!cnfpassword) {
      newErrors.cnfpassword = true;
      hasError = true;
    }

    if (password !== cnfpassword) {
      newErrors.password = true;
      newErrors.cnfpassword = true;
      hasError = true;
      toastMessage("Passwords don't match", "warning");
    }

    setErrors(newErrors);

    if (hasError) {
      toastMessage("Please enter all fields", "warning");
      return;
    }

    let res = await signup(name, email, password);
    if (res) {
      setWp(true);
    }
  };

  return (
    <form className="loginform" onSubmit={handleSignup}>
      <div className="formitem">
        <div className="label">Name</div>
        <input
          ref={nameRef}
          type="text"
          className={errors.name ? "error-border" : ""}
          autocomplete="name"
        />
      </div>
      <div className="formitem">
        <div className="label">Email</div>
        <input
          ref={emailRef}
          type="email"
          className={errors.email ? "error-border" : ""}
          autocomplete="email"
        />
      </div>
      <div className="formitem">
        <div className="label">Password</div>
        <input
          ref={passwordRef}
          type="password"
          className={errors.password ? "error-border" : ""}
          autocomplete="new-password"
        />
      </div>
      <div className="formitem">
        <div className="label cnf">Confirm</div>
        <input
          ref={cnfpasswordRef}
          type="password"
          className={errors.cnfpassword ? "error-border" : ""}
          autocomplete="new-password"
        />
      </div>
      <button type="submit" className="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
