import React, { useState } from "react";
import Header from '../Header/Header';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  const inputStyle = { width: "100%", padding: "8px", marginBottom: "12px" };

  return (
    <div>
      <Header />
      <div className="register_container" style={{ width: "50%", margin: "40px auto" }}>
        <div className="header" style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="text" style={{ fontSize: "28px", fontWeight: "bold" }}>Sign Up</span>
          <a href="/" onClick={() => { gohome(); }} style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
            <span style={{ fontSize: "24px" }}>✖</span>
          </a>
        </div>
        <hr />
        <form onSubmit={register}>
          <div className="inputs">
            <div className="input">
              <label>Username</label>
              <input type="text" name="username" placeholder="Username" className="input_field" style={inputStyle} onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className="input">
              <label>First Name</label>
              <input type="text" name="first_name" placeholder="First Name" className="input_field" style={inputStyle} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="input">
              <label>Last Name</label>
              <input type="text" name="last_name" placeholder="Last Name" className="input_field" style={inputStyle} onChange={(e) => setlastName(e.target.value)} required />
            </div>
            <div className="input">
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" className="input_field" style={inputStyle} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input">
              <label>Password</label>
              <input type="password" name="psw" placeholder="Password" className="input_field" style={inputStyle} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="submit_panel">
            <input className="submit" type="submit" value="Register" style={{ padding: "10px 30px", backgroundColor: "darkturquoise", border: "none", fontSize: "18px" }} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
