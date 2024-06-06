import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBuilding, faXmark } from "@fortawesome/free-solid-svg-icons";
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
  const [auth, setAuth] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
  const { t } = useTranslation();

  useEffect(() => {
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.dropdown');

    const handleToggle = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    toggleBtn.addEventListener('click', handleToggle);

    return () => {
        toggleBtn.removeEventListener('click',handleToggle);
    };
  }, []);

  return (
    <>
        <div className='navbar'>
            <div className='logo'>
                <i><FontAwesomeIcon icon={faBuilding} /></i>
                <a href='#'>AdminMate</a>
            </div>
            <ul className='links'>
                <li><a href='/home'>{t('home')}</a></li>
                <li><a href='/visits'>{t('visits')}</a></li>
                <li><a href='/deliveries'>{t('deliveries')}</a></li>
                <li><a href='/parking'>{t('parking')}</a></li>
            </ul>
            <div className='switcher'>
                <LanguageSwitcher />
            </div>
            <button className="log-out btn" onClick={handleDelete}>{t('logout')}</button>
            <div className='toggle_btn'>
                <i><FontAwesomeIcon icon={isDropdownOpen ? faXmark : faBars} /></i>
            </div>
        </div>

        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <li><a href='/home'>{t('home')}</a></li>
            <li><a href='/visits'>{t('visits')}</a></li>
            <li><a href='/deliveries'>{t('deliveries')}</a></li>
            <li><a href='/parking'>{t('parking')}</a></li>
            <li className='switcher'><LanguageSwitcher /></li>
            <li><button className="log-out btn" onClick={handleDelete}>{t('logout')}</button></li>
        </div>
    </>
  )
}

export default Navbar