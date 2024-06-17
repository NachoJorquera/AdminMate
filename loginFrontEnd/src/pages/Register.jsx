// Importación de bibliotecas y módulos necesarios
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Navbar2 from '../components/Navbar2';
import PageHeading from '../components/PageHeading';
import './Register.css'

function Register() {
    // Definición de variables de estado local para almacenamiento de nombre, email y contraseña
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Hook para navegar entre rutas

    // Controlador de evento submit del formulario
    const handleSubmit = (event) => {
        event.preventDefault(); // Previene que la página se refresque

        // Envía los valores del formulario al endpoint del registro
        axios.post('http://localhost:8081/register', values)
        .then(res => {
            // Procesamiento de la respuesta del servidor
            if(res.data.Status === "Success") {
                navigate('/login'); // Navega a la página de inicio si el registro es exitoso
            } else {
                alert("Error"); // Muestra alerta de error si el registro falla
            }
        })
        .then(err => console.log(err)); // Registra el error en la consola
    };

    // Uso del hook de traducción para soportar multi-lenguaje
    const { t, i18n } = useTranslation();

    // Función para cambiar idioma de la interfaz
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);// Activa el cambio de idioma
        localStorage.setItem('i18nextLng', language); // Almacena el lenguaje seleccionado en localStorage
    };

  // Estructura del componente Register  
  return (
    <>
    <Navbar2 />
    <PageHeading>{t('createAccount')}</PageHeading>
    <div className='d-flex justify-content-center align-items-center bg-dark'>
        <div className='container-fluid bg-white p-3 rounded w-25'>
            <form onSubmit={handleSubmit}>
                {/* <div className='text-center'>
                    <h2>{t('signup')}</h2>
                </div> */}
                <div className='mb-3'>
                    <label htmlFor="name"><strong>{t('name')}</strong></label>
                    <input type="text" placeholder={t('enterName')} name='name' onChange={e => setValues({...values, name: e.target.value})} className='form-control rounded-3' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>{t('email')}</strong></label>
                    <input type="email" placeholder={t('enterEmail')} name='email' onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-3' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>{t('password')}</strong></label>
                    <input type="password" placeholder={t('enterPassword')} name='password' onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-3' />
                </div>
                <div className='text-center d-grid gap-2 col-10 mx-auto'>
                    <button type='submit' className='btn btn-dark w-100 rounded-3'>{t('signup')}</button>
                    <p>{t('terms')}</p>
                    <Link to='/login' className='btn btn-outline-dark border-2 w-100 rounded-3 text-decoration-none'>{t('login')}</Link>
                </div>
            </form>
        </div>
    </div>
    </>
  )
};

export default Register