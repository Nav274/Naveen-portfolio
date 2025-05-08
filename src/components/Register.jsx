import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/authpage.css';

const Register = () => {
  const [error, setError] = useState(null);
  const [successmsg, setsuccessmsg] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER"); 

  async function handleSignUp(ev) {
    ev.preventDefault();
    setError(null);
    setsuccessmsg(null);

    try {
      const requestBody = {  "username":username.trim(), "passwordhash": password.trim(), "email":email.trim(), "role":ev.target.role.value.toString()  };

      const response = await axios.post(
        'http://localhost:8086/api/register',
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials:true
        }
      );

      setsuccessmsg(response.data.message); 
      console.info(successmsg)

    } catch (e) {
      setError(e.response?.data);
      console.error(e.response?.data);
    }
  }

  return (
    
    <div className="auth-page">

    <div className="form-inner-div">
      <h1 className="form-header">Register</h1>

      {error ? <p style={{ color: "red", textAlign: "center",marginTop:"-35px" }}>{error}</p> : successmsg && <p style={{ color: "green",textAlign: "center",marginTop:"-35px"}}>{successmsg}</p>}

      <form onSubmit={handleSignUp} className="form-content">
        <label className="form-label" htmlFor="user_name">Username:</label><br />
        <input className="form-text" type="text" name="user_name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required /><br />

        <label className="form-label" htmlFor="email">Email:</label><br />
        <input className="form-text" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required /><br />

        <label className="form-label" htmlFor="password">Password:</label><br />
        <input className="form-text" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required /><br />

        <label className="form-label" htmlFor="role">Role:</label><br />
        <select name="role" className="form-text select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="CUSTOMER">Customer</option>
        </select><br />

        <button type="submit" className="form-text butt">Register</button><br />
        <Link to="/sign_in" className="form-link">Already a user? Sign in</Link>
      </form>
    </div>
    
    </div>
  );
};

export default Register;
