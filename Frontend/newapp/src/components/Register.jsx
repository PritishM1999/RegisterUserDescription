import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const RegisterEvent = () => {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [disc, setDisc] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleDiscChange = (e) => {
    setDisc(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !phone || !disc || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phone, disc, password }),
      });

    const myRegister = await response.json();
    // console.log("Response status:", res.status);
    console.log("Response data:", myRegister.response);

      if (response.ok) {
        navigate("/");
      } else if (response.status === 409) {
        alert("User already exists with this email or phone.");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.log(error);
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Create an account</h2>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">User:</label>
        <br/>
        <input type="text" name="user" value={username}
          onChange={handleUserChange}
          required
        />
        <br/>
        <label htmlFor="email">Email:</label>
        <br/>
        <input type="email" name="email" value={email}
          onChange={handleEmailChange}
          required
        />
        <br/>
        <br/>
        <label htmlFor="phone">Phone:</label>
        <br/>
        <input type="phone" name="phone" value={phone}
          onChange={handlePhoneChange}
          required
        />
        <br/>
        <br/>
        <label htmlFor="disc">Description:</label>
        <br/>
        <textarea type="text" name="disc" value={disc}
          onChange={handleDiscChange}
          required
        />
        <br/>
        <label htmlFor="password">Password:</label>
        <br/>
        <input type="password" name="password" value={password}
          onChange={handlePasswordChange}
          required
        />
        <br/>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <br/>
        <input  type="password"  name="confirmPassword" value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <br/>
 
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate("/")}>Back to login</button>

      </form>
    </div>
  );
};

export default RegisterEvent;