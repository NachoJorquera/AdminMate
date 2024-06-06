// Importación de bibliotecas y módulos necesarios
import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function AuthMenu() {
    // Estado para controlar si el usuario está autenticado y almacenar su nombre
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');

    // Config de axios para manejar cookies
    axios.defaults.withCredentials = true;

    // Hook de efecto para realizar la solicitud GET al cargar el componente
    useEffect(() => {
      axios.get('http://localhost:8081')
      .then(res => {
        if(res.data.Status === "Success") {
          setAuth(true); // Actualiza estado de autenticación a verdadero
          setName(res.data.name); // Almacena el nombre del usuario
        } else {
          setAuth(false); // Actualiza el estado de autenticación a falso si falla
        }
      })
      .then(err => console.log(err)); // Registra el error en la consola
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

    // Función para manejar el cierre de sesión
    const handleDelete = () => {
      axios.get('http://localhost:8081/logout')
      .then(res => {
        location.reload(true); // Recarga la página para reflejar el estado de no autenticado
      }).catch(err => console.log(err)); // Captura y registra errores en la consola
    };

    // Uso del hook de traducción para soportar multi-lenguaje
    const { t, i18n } = useTranslation();

    // Función para cambiar idioma de la interfaz
    const changeLanguage = (language) => {
        i18n.changeLanguage(language); // Activa el cambio de idioma
        localStorage.setItem('i18nextLng', language); // Almacena el lenguaje seleccionado en localStorage
    };

  // Estructura del componente Home  
  return (
    <div className='d-flex justify-content-center align-items-center'style={{ height: '100vh'}}>
      <div className='container mt-4 d-flex justify-content-center w-50 bg-dark text-light rounded-4 p-3'>
        {
          auth ?
          <div>
            <h3 className='text-center my-5'>{t('authMessage')} {name}</h3>
            <button className='btn btn-danger w-100 rounded-5 my-3' onClick={handleDelete}>{t('logout')}</button>
          </div>
          :
          <div>
            <h3 className='text-center my-4'>{t('notAuthMessage')}</h3>
            <h3 className='text-center'>{t('loginNow')}</h3>
            <Link to="/login" className='btn btn-success w-100 rounded-5 my-3'>{t('login')}</Link>
            <p className='text-center'>{t('registerMessage')}</p>
            <Link to="/register" className='btn btn-success w-100 rounded-5 my-3'>{t('signup')}</Link>
            <div className='mt-3 btn-group'>
                <button onClick={() => changeLanguage('en')} className='btn btn-secondary btn-sm' style={{ '--bs-btn-padding-y': '.15rem', '--bs-btn-padding-x': '.25rem', '--bs-btn-font-size': '.75rem' }}>{t('english')}</button>
                <button onClick={() => changeLanguage('es')} className='btn btn-secondary btn-sm' style={{ '--bs-btn-padding-y': '.15rem', '--bs-btn-padding-x': '.25rem', '--bs-btn-font-size': '.75rem' }}>{t('spanish')}</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
};

export default AuthMenu