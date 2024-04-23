import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
            } else {
                alert("Error");
            }
        })
        .then(err => console.log(err));
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <div className='text-center'>
                <h2>Sign-Up</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder='Enter Name' name='name' onChange={e => setValues({...values, name: e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email' onChange={e => setValues({...values, email: e.target.value})} 
                    className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password' onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='d-grid gap-1 col-10 mx-auto'>
                    <button type='submit' className='btn btn-success w-100 rounded-5'> Sign up</button>
                    <p className='text-center'>You are agree to our terms and policies</p>
                    <Link to='/login' className='btn btn-outline-success border-2 w-100 rounded-5 text-decoration-none'>Log In</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register