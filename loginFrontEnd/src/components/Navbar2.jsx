import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import './Navbar2.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBuilding, faXmark } from "@fortawesome/free-solid-svg-icons";
import LanguageSwitcher from './LanguageSwitcher';

function Navbar2() {
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

    // Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();

    return (
        <>
            <div className='navbar2'>
                {/* <div className='logo'>
                    <i><FontAwesomeIcon icon={faBuilding} /></i>
                    <a href='/home'>AdminMate</a>
                </div> */}
                <div className='switcher'>
                    <LanguageSwitcher />
                </div>
            </div>
        </>
  )
}

export default Navbar2