import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // Hook de efecto para realizar la solicitud GET al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:8081')
    .then(res => {
      if(res.data.Status === "Success") {
        setAuth(true); // Actualiza estado de autenticación a verdadero
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
      navigate('/login');
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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">AdminMate</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">{t('home')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">{t('visits')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/settings">{t('parking')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">{t('deliveries')}</Link>
            </li>
          </ul>
          <div className='btn-group'>
            <button onClick={() => changeLanguage('en')} className='btn btn-secondary btn-sm me-2' >{t('english')}</button>
            <button onClick={() => changeLanguage('es')} className='btn btn-secondary btn-sm me-2' >{t('spanish')}</button>
            <button className="btn btn-danger" onClick={handleDelete}>{t('logout')}</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;