import React, { useState }from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login attempt:', username, password);
    };

    return (
        <div className='login'>
            <div className='login-header'>
                <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit} className='login-form'>
                <h3>Username/Email:</h3>
                <input type='text' className='holder' id='username' value={username} onChange={e => setUsername(e.target.value)}></input>
                <h3>Password:</h3>
                <input type='password' className='holder' id='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                <button type='submit' className='login-button'>Log In</button>
            </form>
        </div>
    );
}

export default Login;