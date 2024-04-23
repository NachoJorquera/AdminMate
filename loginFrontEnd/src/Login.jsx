import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
            } else {
                alert(res.data.Error);
            }
        })
        .then(err => console.log(err));
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
        <div className='p-3 bg-white rounded w-25'>
            <div className='text-center'>
                <h2>Sign-In</h2>
                <p>Please enter your email and password</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email'placeholder='Enter Email' name='email' onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-5 border-2' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password'placeholder='Enter Password' name='password' onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-5 border-2' />
                </div>
                <div className='d-grid gap-2 col-10 mx-auto'>
                    <button type='submit' className='btn btn-success w-100 rounded-5'>Log In</button>
                    <Link to='/register' className='btn btn-outline-success border-2 w-100 rounded-5 text-decoration-none'>Create Account</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login