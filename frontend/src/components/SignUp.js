import React, { useEffect, useState } from "react";
import {json, useNavigate} from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');

        if(auth)
        {
            navigate('/')
        }
    })

    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:4500/register',{
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json()
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result.result))
        localStorage.setItem('token',JSON.stringify(result.auth))

        if(result){
            navigate('/')
        }
    }
    return (
        <div className="register">
            <h2>Register</h2>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
            <input className="inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;