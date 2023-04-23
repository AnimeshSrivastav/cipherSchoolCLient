import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";
import { useStateValue } from "../redux/Stateprovider";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fistName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const [dispatch] = useStateValue();
  const navigate = useNavigate();
  const handleClick = () => {
    axios
      .post("http://localhost:9000/user/login", {
        email: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        dispatch({
          type: "SETUSER",
          item: {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          },
        });
      })
      .then(() => {
        navigate("/home");
        setPassword("");
      })
      .catch((e) => console.log(e.response.data));
  };

  const handleSignup = () => {
    axios
      .post("http://localhost:9000/user/signup", {
        firstName: fistName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then(() => {
        setIsLogin((prev) => !prev);
      })
      .catch((e) => console.log(e.response.data));
  };

  return (
    <>
      {isLogin ? (
        <div className="login">
          <div className="login__from">
            <TextField
              sx={{ marginBlock: 2, width: "30vw" }}
              label="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{ marginBlock: 2, width: "30vw" }}
              label="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              sx={{
                marginBlock: 2,
                backgroundColor: "rgb(255, 166, 49)",
                color: "white",
                width: "10vw",
              }}
              onClick={() => handleClick()}
            >
              Login
            </Button>
            <Typography onClick={() => setIsLogin((prev) => !prev)}>
              Don't have an Accout? Signup Here
            </Typography>
          </div>
        </div>
      ) : (
        <div className="signup">
          <div className="signup__from">
            <TextField
              sx={{ marginBlock: 2, width: "30vw" }}
              label="First Name"
              required
              placeholder="firtname"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              sx={{ marginBlock: 2, width: "30vw" }}
              label="Last Name"
              required
              placeholder="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              sx={{ marginBlock: 2, width: "30vw" }}
              label="Email"
              required
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ marginBlock: 2, width: "30vw" }}
              label="password"
              required
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              sx={{
                marginBlock: 2,
                backgroundColor: "rgb(255, 166, 49)",
                color: "white",
                width: "10vw",
              }}
              onClick={() => handleSignup()}
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
