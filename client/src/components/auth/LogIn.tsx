import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "../../API/useJwt";
import { LogInValueProps } from "../../types/Types";

//Initial Values
const InitialLogInValue = {
  email: "",
  password: "",
};

const LogIn = () => {
  const [logInValue, setLogInValue] =
    useState<LogInValueProps>(InitialLogInValue);

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogInFormChanges = (e: any) => {
    setLogInValue({
      ...logInValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await useJwt.logIn(logInValue);
      // console.log(res);
      if (res?.status == 200) {
        localStorage.setItem("refreshToken", res?.data?.refreshToken);
        localStorage.setItem("accessToken", res?.data?.accessToken);

        // Redirect
        navigate("/");
      }
    } catch (error) {
      alert("Error!!");
    }
  };

  return (
    <div>
      {/* <h2>Login Form</h2> */}

      <form onSubmit={handleFormSubmit}>
        <div className="">
          <h1>{"TM LogIn"}</h1>
        </div>

        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            onChange={handleLogInFormChanges}
            type="email"
            placeholder="Enter Email"
            name="email"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            onChange={handleLogInFormChanges}
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />

          <button type="submit">LogIn</button>

          <label>
            <input type="checkbox" name="remember" /> Remember
            me
          </label>
        </div>

        <div className="container">
          <button type="button" className="">
            Cancel
          </button>
          <span className="">
            Forgot <a href="#">password?</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
