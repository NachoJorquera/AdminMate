// Importación de bibliotecas y módulos necesarios
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import Navbar2 from '../components/Navbar2';
import PageHeading from '../components/PageHeading';
import './Login.css';

function Login() {
    // Definición de variables de estado local para almacenamiento de email y contraseña
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Hook para navegar entre rutas
    axios.defaults.withCredentials = true; // Config de axios para manejar cookies

    // Controlador de evento submit del formulario
    const handleSubmit = (event) => {
        event.preventDefault(); // Previene que la página se refresque

        // Envía los valores del formulario al endpoint del login
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            // Procesamiento de la respuesta del servidor
            if(res.data.Status === "Success") {
                navigate('/home'); // Navega a la página de inicio si el login es exitoso
            } else {
                alert(res.data.Error); // Muestra alerta de error si el login falla
            }
        })
        .then(err => console.log(err)); // Registra el error en la consola
    };

    // Uso del hook de traducción para soportar multi-lenguaje
    const { t, i18n } = useTranslation(); 

    // Función para cambiar idioma de la interfaz
    const changeLanguage = (language) => {
        i18n.changeLanguage(language); // Activa el cambio de idioma
        localStorage.setItem('i18nextLng', language); // Almacena el lenguaje seleccionado en localStorage
    };

  // Estructura del componente Login
  return (
    <>
    <Navbar2 />
    <PageHeading>AdminMate</PageHeading>
    <div className='d-flex justify-content-center align-items-center'>
        <div className='container-fluid p-3 bg-white rounded w-75'>
            <form onSubmit={handleSubmit}>
                <div className='text-center'>
                    <h1>{t('signin')}</h1>
                    <p className='fs-4'>{t('instruction')}</p>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>{t('email')}</strong></label>
                    <input type='email'placeholder={t('enterEmail')} name='email' onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-3' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>{t('password')}</strong></label>
                    <input type='password'placeholder={t('enterPassword')} name='password' onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-3' />
                    <p><a href='#'>Forgot Password?</a></p>
                </div>
                <div className='col-6 mx-auto mb-5'>
                    <button type='submit' className='btn btn-dark w-100 rounded-3'>{t('login')}</button>    
                </div>
                <div className='text-center'>
                    <p><a href='/register'>Dont have an account? <strong>Sign-up</strong></a></p>
                </div>
            </form>
        </div>
    </div>
    </>
  )
};

export default Login