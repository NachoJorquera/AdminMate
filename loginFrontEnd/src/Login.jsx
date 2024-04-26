import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

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

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
        <div className='p-3 bg-white rounded w-25'>
            <div className='text-center'>
                <h2>{t('signin')}</h2>
                <p>{t('instruction')}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>{t('email')}</strong></label>
                    <input type='email'placeholder={t('enterEmail')} name='email' onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-5 border-2' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>{t('password')}</strong></label>
                    <input type='password'placeholder={t('enterPassword')} name='password' onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-5 border-2' />
                </div>
                <div className='d-grid gap-2 col-10 mx-auto'>
                    <button type='submit' className='btn btn-success w-100 rounded-5'>{t('login')}</button>
                    <Link to='/register' className='btn btn-outline-success border-2 w-100 rounded-5 text-decoration-none'>{t('createAccount')}</Link>
                </div>
            </form>
            <div className='mt-3'>
                <button onClick={() => changeLanguage('en')} className='btn btn-outline-secondary btn-sm'>{t('english')}</button>
                <button onClick={() => changeLanguage('es')} className='btn btn-outline-secondary btn-sm'>{t('spanish')}</button>
            </div>
        </div>
    </div>
  )
}

export default Login