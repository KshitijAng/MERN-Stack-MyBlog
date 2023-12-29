import React, { useState } from 'react';
import '../register/register.css';

const Register=() =>{

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  async function r1 (ev) {
    ev.preventDefault();


    const response = await fetch('http://localhost:4000/register' , {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},

    });



    if (response.status === 200) {
      alert('Registration Successful');
    } else {
      alert('Already Registered');
    }

  }


    return(
        <>
        <form className="register" onSubmit={r1}>
        <div className="gpt3__header-content-r">
        <h1 className="gradient__text">
          Register Here
        </h1>
        </div>
        <input type="text" placeholder='Username' value ={username} onChange ={ev => setUsername(ev.target.value)}/>
        <input type="password" placeholder='Password' value = {password} onChange = {ev => setPassword(ev.target.value)}/>
        <button>Register</button>
        </form>

        </>
    )
}

export default Register;