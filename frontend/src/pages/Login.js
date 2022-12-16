import React, { useState } from "react";
import {useNavigate}from 'react-router-dom'
import axios from 'axios';

const Login=()=> {
    const history=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
const loginUser =()=>{
   
     const data = {
      'email':email,
      'password':password,
  }

     axios.post('http://localhost:4000/api/login', data)
     .then(function (response) {
      console.log(response)
      if(response.data.status==='ok'){
        //alert('Successfully user created');
        localStorage.setItem('user',data.user)
        history('/dashboard')
      }else{
        alert(response.data.error);
      }
       
     })
     .catch(function (error) {
         console.log(error);
     })
  
    }
  return (
   <div className='container'>
   <h1 className='text-center'>Login</h1>
   <div className='form-group'>
            <label htmlFor="">User Name</label>
            <input
            className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
       </div>

  <div className='form-group'>
  <label>Password:</label>
  <input className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
  </div>
  <div className='form-group mt-2 text-center'>
            <input type="button" value="Login" className='btn btn-primary' onClick={loginUser}/> 
           
       </div>
   
    </div>
  );
}

export default Login;
