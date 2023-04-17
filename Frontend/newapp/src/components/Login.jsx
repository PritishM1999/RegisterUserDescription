import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginEvent = () => {
  const [email, setValue] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSignin = async (event) => {
    event.preventDefault();

    console.log(`Submitted: ${email} - ${password}`);

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // const handleSignin = async (event) => {
    //   event.preventDefault();
  
    //   console.log(`Submitted: ${value} - ${password}`);
  
    //   const res = await fetch("http://localhost:5000/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: value, password }),
    //   });

    // const res2 =  await fetch("http:localhost:5000/login"{
    //     method: "POST",
    //     headers: { "Content-type": "applictaion/json"},
    //     body: JSON.stringify( {email: value, password }),
    // });

    const mylogins = await res.json();
    console.log("Response status:", res.status);
    console.log("Response data:", mylogins);

    if (res.status === 400) {
      alert("User does not exist or invalid credentials");
    } else if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify({ token: mylogins.token, user: mylogins.email })
      );
      console.log("User data:", JSON.parse(localStorage.getItem("user")).user);
      navigate("/home");
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleChange = (event) => {
    if (event.target.type === "text") {
      setValue(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    }
  };

  return (
    <div >
      <div>
        <h1>SIGN IN</h1>

        <form>
          <label>Email:</label><br/>
          <input
            // type="text" placeholder="pritish@gmail.com" value={value}
            type="text" placeholder="pritish@gmail.com" value={email}
            onChange={handleChange}
            required
          />
          <br/>
          <div>
          <label>Password:</label><br/>
            <input
               type="password" name="password" placeholder="Pass@123" value={password}
              onChange={handleChange}
              required
            />
          </div>
          <h4>Forgot Password?</h4>
          <button type="submit" onClick={handleSignin}>
            Sign In
          </button>
        </form>
      </div>
      <p>Don't Have An Account? click here to register</p>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default LoginEvent;



