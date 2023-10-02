import React, { Fragment, useEffect } from 'react'
import { Link, json, useNavigate} from 'react-router-dom'
const Nav = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth)
        {
            navigate('/')
        }
    },[])
    const logout=()=>{
        console.log("Logout Success...");
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
        <img 
        alt='logo'
        className='logo'
        src='https://yt3.googleusercontent.com/ytc/AOPolaSpbKm2DF0CtKIde4QLZnbeabZON-IiDc1XqtYM0Q=s900-c-k-c0x00ffffff-no-rj'  />
        {
            auth ? 
            <ul className='nav-ul'>
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <Link to='/signup' onClick={logout}>LogOut ({JSON.parse(auth).name})</Link>
               

            </ul>:
            <ul className='nav-ul nav-right'>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
            </ul>
        }
        </div>
    )
}

export default Nav;