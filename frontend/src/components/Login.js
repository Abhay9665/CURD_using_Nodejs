import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:4500/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate('/')
        } else {
            alert("enter valid name")

        }
        console.log(result);
    }
    return (
        <div className='login'>
            <input className='inputBox' onChange={(e) => setEmail(e.target.value)} value={email} type='text' placeholder='Enter Email' />
            <input className='inputBox' onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Enter Password' />
            <button className="appButton" onClick={handleLogin} type="button">Login</button>
        </div>
    )
}

export default Login;