import photo1 from '../../assets/photo1.png'; 
import React, { useState } from 'react';
import './signUp.css'; 
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SignUpApiCall } from '../../utils/Apis';   


export default function SignUp() {


    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const handleRegister = async () => {
      
        setFirstNameError(!firstName);
        setLastNameError(!lastName);
        setUsernameError(!username);
        setPasswordError(!password);
        setConfirmPasswordError(!confirmPassword);
        setPasswordMatchError(password !== confirmPassword);

        if (firstName && lastName && username && password && confirmPassword && password === confirmPassword) {
            const payload = {
                firstName,
                lastName,
                email: username, 
                password,
                "service":'advance'
            };

            try {
                const response = await SignUpApiCall(payload, "/user/userSignUp");
                
                console.log("Registration successful:", response);
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }
    };

    return (
        <div className="container">
            <div className="signup-card">
                <div className="leftSide">
                    <h1 id="name">Fundo</h1>
                    <h2>Create your Fundo Account</h2>
                    <form className="signup-form" id="signupForm">
                        <div className="name-fields">
                            <div className="field-wrapper">
                                <TextField
                                    required
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    error={firstNameError}
                                    helperText={firstNameError ? "First name is required" : ""}
                                />
                            </div>
                            <div className="field-wrapper">
                                <TextField
                                    required
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    error={lastNameError}
                                    helperText={lastNameError ? "Last name is required" : ""}
                                />
                            </div>
                        </div>

                        <div className="field-wrapper">
                            <TextField
                                required
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={usernameError}
                                helperText={usernameError ? "Username is required" : "You can use letters, numbers, and periods"}
                            />
                        </div>

                        <div className="password-field">
                            <div className="field-wrapper">
                                <TextField
                                    required
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={passwordError}
                                    helperText={passwordError ? "Password is required" : ""}
                                />
                            </div>
                            <div className="field-wrapper">
                                <TextField
                                    required
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={confirmPasswordError || passwordMatchError}
                                    helperText={
                                        confirmPasswordError ? "Confirm password is required" :
                                        passwordMatchError ? "Passwords do not match" : ""
                                    }
                                />
                            </div>
                        </div>
                        <p className="hint">Use 8 or more characters with a mix of letters, numbers, and symbols</p>

                        <div className="button-part">
                            <a href="#" className="signin" >Sign in Instead</a>
                            <Button variant="contained" onClick={handleRegister}>Register</Button>
                        </div>
                    </form>
                </div>

                <div className="rightSide">
                     <img src={photo1} alt="User Icon" />
                    <p>One Account. All of Fundo working for you.</p>
                </div>
            </div>
        </div>
    );
}