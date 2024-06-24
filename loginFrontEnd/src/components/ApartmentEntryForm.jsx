import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ApartmentEntryForm.css';
import Modal from './Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

const ApartmentEntryForm = () => {
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [error, setError] = useState(null);
    const [modalChildren, setModalChildren] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setApartmentNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/check-apartment', {
                apartment_number: apartmentNumber
            });

            if (response.data.exists) {
                navigate(`/deliveries/${apartmentNumber}`);
                console.log('Departamento existente');
                // console.log('apartmentNumber:', apartmentNumber);
                // console.log('apartmentNumber type:', typeof apartmentNumber);
            } else {
                setModalChildren(t('apartError'));
                setShowModal(true);
                console.log('No existe un departamento registrado para ese número');
            }
        } catch (err) {
            setModalChildren('Error ocurred');
            setShowModal(true);
        }
    };

    //Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className='container-fluid p-3 rounded w-75'>
            <div className='card-body p-1'>
                <label className='card-title' htmlFor='apartmentNumber'>{t('apartNum')}</label>
                <form className='card-form' onSubmit={handleSubmit}>
                    <InputGroup size="lg" className='mb-5'>
                        <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faBuilding} /></InputGroup.Text>
                            <Form.Control type='number' id='apartmentNumber' value={apartmentNumber} onChange={handleInputChange} required placeholder={t('apartInput')} aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                            />
                    </InputGroup>
                    <button className='card-button d-flex mx-auto mb-5' onClick={handleSubmit}>{t('next')}</button>
                </form>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} children={modalChildren} />
        </div>
    </div>
  )
}

export default ApartmentEntryForm