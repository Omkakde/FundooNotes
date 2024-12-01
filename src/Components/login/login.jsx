import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginApiCall } from "../../utils/Apis";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar"; 
import Alert from "@mui/material/Alert";

export default function Login() {
  const [showErr, setErrorMsg] = useState(false);
  const [showPass, setErrorPass] = useState(false);
  const [getEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false); 
  const [toasterMessage, setToasterMessage] = useState(""); 
  const [toasterSeverity, setToasterSeverity] = useState("success"); 

  const navigate = useNavigate();
  const passwordRegex = /^[a-zA-Z0-9@^]+$/;

  const handleToasterClose = () => setToasterOpen(false); 

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;

  
    if (!getEmail.trim()) {
      setErrorMsg(true);
      valid = false;
    } else {
      setErrorMsg(false);
    }

   
    if (!password || !passwordRegex.test(password)) {
      setErrorPass(true);
      valid = false;
    } else {
      setErrorPass(false);
    }

    if (valid) {
      setLoading(true);
      setErrorMessage("");

      loginApiCall(getEmail, password)
        .then((response) => {
          const accessToken = localStorage.getItem("accessToken");

          if (accessToken) {
            setErrorMessage("Login successful.");
            setToasterMessage("Login successful!");
            setToasterSeverity("success");
            setToasterOpen(true); 
            navigate("/dashboard");
          } else {
            setErrorMessage("Failed to store token.");
            setToasterMessage("Failed to store token.");
            setToasterSeverity("error");
            setToasterOpen(true); 
          }
        })
        .catch((error) => {
          console.error("Login Error:", error.response?.data || error.message);
          setErrorMessage("Invalid credentials.");
          setToasterMessage("Login failed. Please check your credentials.");
          setToasterSeverity("error");
          setToasterOpen(true); 
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div className="main-container">
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <div className="main">
            <div className="head">
              <h3 id="head-text">Fundoo</h3>
              <h3 className="firstLine">Sign In</h3>
              <h3 className="secondLine">Use Your Fundoo Account</h3>
            </div>

            <div className="name-container">
              <TextField
                style={{ margin: "8px", width: "80%" }}
                id="outlined-first-name"
                value={getEmail}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                fullWidth
                required
              />
              {showErr && <span className="emailErr">Email is required.</span>}
            </div>

            <div className="password-container">
              <TextField
                style={{ margin: "8px", width: "80%" }}
                id="outlined-password-input"
                label="Password"
                className="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                fullWidth
                required
              />
              <h5 className="line1">Forgot Password?</h5>
              {showPass && (
                <span className="passwordErr">Password is invalid.</span>
              )}
            </div>

            {errorMessage && (
              <div className="errorMessage" style={{ color: "red" }}>
                {errorMessage}
              </div>
            )}

            <div className="signin-register">
              <a href="#" className="line3">
                <h4 onClick={() => navigate("/signUp")}>Create Account</h4>
              </a>
              <div className="buttoncnt">
                <Button
                  type="submit"
                  className="submit-btn"
                  variant="contained"
                  disabled={loading}
                >
                  login
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </div>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={toasterOpen}
        autoHideDuration={6000}
        onClose={handleToasterClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleToasterClose}
          severity={toasterSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toasterMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
