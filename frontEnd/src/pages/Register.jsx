// Importación de bibliotecas y módulos necesarios
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import Navbar2 from '../components/Navbar2';
import PageHeading from '../components/PageHeading';
import './Register.css'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

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
    <PageHeading>AdminMate</PageHeading>
    <div className='d-flex justify-content-center align-items-center'>
        <div className='container-fluid p-3 d-flex justify-content-center bg-white rounded w-75'>
            <form onSubmit={handleSubmit}>
                <div className='text-center mb-5'>
                    <h1>{t('signup')}</h1>
                </div>
                <div className='mb-4'>
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                            <Form.Control
                                type='text'
                                placeholder={t('enterName')}
                                name='name'
                                onChange={e => setValues({...values, name: e.target.value})}
                                required
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                            />
                    </InputGroup>
                </div>
                <div className='mb-4'>
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                            <Form.Control
                                type='email'
                                placeholder={t('enterEmail')}
                                name='email'
                                onChange={e => setValues({...values, email: e.target.value})}
                                required
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                            />
                    </InputGroup>
                </div>
                <div className='mb-5'>
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                            <Form.Control
                                type='password'
                                placeholder={t('enterPassword')}
                                name='password'
                                onChange={e => setValues({...values, password: e.target.value})}
                                required
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                            />
                    </InputGroup>
                </div>
                <div className='text d-grid gap-2 col-10 mx-auto'>
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