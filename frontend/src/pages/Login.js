import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (event) => {
    
   event.preventDefault();
    
    const data = {
      email: email,
      password: password,
    };
   
    axios
      .post("http://localhost:4000/api/login", data)
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          localStorage.setItem("user", response.data.user);
          history("/dashboard");
        } else {
          alert(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="card">
          <div className="card-header">Login</div>
          <div className="card-body" >
          <form onSubmit={loginUser} className="was-validated">
            <div className="form-group">
              <label htmlFor="">User Name</label>
              <input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email" required
              />
               <div className="valid-feedback">Valid.</div>
    <div className="invalid-feedback">Please fill out this field.</div>
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password" required
              />
               <div className="valid-feedback">Valid.</div>
    <div className="invalid-feedback">Please fill out this field.</div>
            </div>

            <div className="form-group mt-2 text-center">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary"
                
              />
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
