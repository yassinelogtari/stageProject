import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import centre from "../../images/centre.jpg";
import cimf from "../../images/cimf.png";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import "./login.scss";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      if (response.data && typeof response.data === "object") {
        localStorage.setItem("userid", response.data.user_id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userfirstname", response.data.firstname);
        localStorage.setItem("userlastname", response.data.lastname);
        localStorage.setItem("useremail", response.data.email);
        navigate("/list/" + response.data.user_id);
        localStorage.setItem("isLogged", true);
        window.location.reload();
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="logInContainer">
      <div className="logInLeftContainer">
        <img src={centre} alt="" className="logInImage" />
      </div>

      <div className="logInFormContainer">
        <div className="cimfImage">
          <img src={cimf} alt="" />
        </div>
        <div className="logInFormTitleContainer">
          <h3 className="logInTitle">Log In validation</h3>
          <p className="paragrapeh"> Enter your username and your password </p>
        </div>
        <form className="logInForm" onSubmit={handleLogin}>
          <TextField
            className="logInInput"
            label="Username "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            }}
            margin="normal"
          />
          <p className="loginFormInputError"></p>
          <TextField
            className="logInInput"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
            }}
            margin="normal"
          />

          <button className="logInButton">Log In</button>
        </form>
      </div>
    </div>
  );
}
