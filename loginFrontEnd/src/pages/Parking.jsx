import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PageHeading from '../components/PageHeading';
import './Parking.css';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

function Parking() {
  const [patente, setPatente] = useState('');
  const [nombre, setNombre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [estacionamiento, setEstacionamiento] = useState('');
  const [searchPatente, setSearchPatente] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const [sourceTable, setSourceTable] = useState('');

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Activa el cambio de idioma
    localStorage.setItem('i18nextLng', language); // Almacena el lenguaje seleccionado en localStorage
};

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = { patente, nombre, departamento, estacionamiento };

    axios.post('http://localhost:8081/park', formData)
      .then(response => {
        if (response.data.status === 'success') {
          alert('Datos enviados exitosamente');
          setPatente('');
          setNombre('');
          setDepartamento('');
          setEstacionamiento('');
        } else {
          alert('Error al enviar los datos');
        }
      })
      .catch(error => {
        console.error('Error al enviar los datos: ', error);
        alert('Error al enviar los datos');
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    
    axios.get(`http://localhost:8081/parking/${searchPatente}`)
    .then(response => {
      if (response.data.status === 'success') {
        setSearchResult(response.data.data);
        setSourceTable(response.data.source);
        if (response.data.source === 'frequent_visits') {
          setSearchMessage('Datos encontrados en la tabla de frequent_visits.');
        } else if (response.data.source === 'parking') {
          setSearchMessage('Datos encontrados en la tabla de parking.');
        }
      } else {
        setSearchMessage('No se encontraron datos en ninguna de las tablas');
        setSearchResult(null);
        setSourceTable('');
      }
    })
    .catch(error => {
      console.error('Error al buscar los datos: ', error);
      setSearchMessage('Error al buscar los datos');
      setSearchResult(null);
      setSourceTable('');
    });
  };

  return (
    <>
      <Navbar />
      <PageHeading>{t('parkh1')}</PageHeading>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='container-fluid p-3 rounded'>
          <div className='card-body p-5'>
            <h1 className='mb-5'><strong>{t('plateSearch')}</strong></h1>
            <div className='card-content'>
              <div className='card-form'>
                <Form onSubmit={handleSearch} className='w-100'>
                  <Form.Group controlId="searchPatente">
                    <InputGroup className='mb-4' size="lg">
                      <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faCar} /></InputGroup.Text>
                      <Form.Control type="text" placeholder={t('getPlate')} value={searchPatente} onChange={(e) => setSearchPatente(e.target.value)} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <button className='card-button mb-5' type='submit'>{t('search')}</button>
                  </Form.Group>
                </Form>
                <div className='d-flex justify-content-center mb-4'>
                  {searchResult && (
                    <div className='results'>
                      <h4>{t('results')}</h4>
                      
                      {sourceTable === 'parking' ? (
                          <>
                            <p><strong>{t('nameParking')}</strong> {searchResult.nombre}</p>
                            <p><strong>{t('departmentParking')}</strong> {searchResult.departamento}</p>
                            <p><strong>{t('parkingParking')}</strong> {searchResult.estacionamiento}</p>
                            <p><strong>Hora llegada:</strong> {searchResult.created_at}</p>
                          </>
                        ) : sourceTable === 'frequent_visits' ? (
                          <>
                            <p><strong>{t('nameParking')}</strong> {searchResult.name}</p>
                            <p><strong>{t('RUT')}</strong> {searchResult.rut}</p>
                            <p><strong>{t('departmentParking')}</strong> {searchResult.department}</p>
                            <h4>Visita frecuente!</h4>
                          </>
                      ) : null}
            
                    </div>
                  )}


                </div>
              </div>
            </div>
            <h1 className='mb-5'><strong>{t('parkRegister')}</strong></h1>
            <div className='container'>
              <Form onSubmit={handleSubmit}>
                <Row className='mb-3'>
                  <Col>
                    <InputGroup className='mb-3' controlId='nombre'>
                      <Form.Control size="lg" type="text" placeholder={t('enterName')} value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </InputGroup>
                    <InputGroup className='mb-3' controlId='patente'>
                      <Form.Control size="lg" type="text" placeholder={t('getPlate')} value={patente} onChange={(e) => setPatente(e.target.value)} />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className='mb-3' controlId='departamento'>
                      <Form.Control size="lg" type="text" placeholder={t('getDepartment')} value={departamento} onChange={(e) => setDepartamento(e.target.value)} />
                    </InputGroup>
                    <InputGroup className='mb-3' controlId='estacionamiento'>
                      <Form.Control size="lg" type="number" placeholder={t('getParking')} value={estacionamiento} onChange={(e) => setEstacionamiento(e.target.value)} />
                    </InputGroup>
                  </Col>
                </Row>
                <Form.Group className='d-flex justify-content-center'>
                  <button className='card-button' type='submit'>{t('send')}</button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Parking;
