import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PageHeading from '../components/PageHeading';
import './Parking.css';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function Parking() {
  const [patente, setPatente] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [estacionamiento, setEstacionamiento] = useState('');
  const [searchPatente, setSearchPatente] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Activa el cambio de idioma
    localStorage.setItem('i18nextLng', language); // Almacena el lenguaje seleccionado en localStorage
};

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = { patente, nombre, apellido, departamento, estacionamiento };

    axios.post('http://localhost:8081/park', formData)
      .then(response => {
        if (response.data.status === 'success') {
          alert('Datos enviados exitosamente');
          setPatente('');
          setNombre('');
          setApellido('');
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

  const handleSearch = () => {
    axios.get(`http://localhost:8081/parking/${searchPatente}`)
      .then(response => {
        if (response.data.status === 'success') {
          setSearchResult(response.data.data);
        } else {
          alert('No se encontraron datos');
        }
      })
      .catch(error => {
        console.error('Error al buscar los datos: ', error);
        alert('Error al buscar los datos');
      });
  };

  return (
    <>
      <Navbar />
      <PageHeading>{t('parkh1')}</PageHeading>
      <div className='espacio'>
        <div className='formulario espacio'>

        <h3>{t('plateSearch')}</h3>
          <Form className='espacio_abajo'>
            <Form.Group controlId="searchPatente">
              <Form.Label>{t('plate')}</Form.Label>
              <Form.Control 
                type="text" 
                placeholder={t('getPlate')}
                value={searchPatente}
                onChange={(e) => setSearchPatente(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSearch}>
            {t('search')}
            </Button>
          </Form>
          {searchResult && (
            <div className='resultado'>
              <h4>{t('results')}</h4>
              <p><strong>{t('nameParking')}</strong> {searchResult.nombre}</p>
              <p><strong>{t('surnameParking')}</strong> {searchResult.apellido}</p>
              <p><strong>{t('departmentParking')}</strong> {searchResult.departamento}</p>
              <p><strong>{t('parkingParking')}</strong> {searchResult.estacionamiento}</p>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="nombre">
                  <Form.Label>{t('nameParking')}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={t('enterName')}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="patente">
                  <Form.Label>{t('plate')}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={t('getPlate')}
                    value={patente}
                    onChange={(e) => setPatente(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                <Button variant="primary" type="submit">
                {t('send')}
            </Button>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="apellido">
                  <Form.Label>{t('surnameParking')}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={t('getSurname')}
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="departamento">
                  <Form.Label>{t('departmentParking')}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={t('getDepartment')}
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="estacionamiento">
                  <Form.Label>{t('parkingParking')}</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder={t('getParking')}
                    value={estacionamiento}
                    onChange={(e) => setEstacionamiento(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>

      </div>
    </>
  );
}

export default Parking;
