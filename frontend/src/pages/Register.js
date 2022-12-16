import React, { useState } from "react";
import {useNavigate}from 'react-router-dom'
import axios from 'axios';

function Register() {
  const history=useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser (event){
      event.preventDefault()
      const data = {
    'name':name,
    'email':email,
    'password':password,
}
console.log(data)
   axios.post('http://localhost:4000/api/register', data)
   .then(function (response) {
    console.log(response)
    if(response.data.status==='ok'){
      alert('Successfully user created');
      history('/')
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
   <h1 className='text-center'>Register</h1>
      <form onSubmit={registerUser}>
      <div className='form-group'>
  <label>User name:</label>
  <input className='form-control'
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        
        </div>
        <div className='form-group'>
  <label>Email:</label>
  <input className='form-control'
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
        /></div>
        <div className='form-group mt-2 text-center'>
            <input type="submit" value="Register" className='btn btn-primary'/> 
           
       </div>
        
      </form>
    </div>
  );
}

export default Register;
