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
import { faCar, faUser, faBuilding,faSquareParking } from "@fortawesome/free-solid-svg-icons";


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
          monitorEntryTime(formData.patente);
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
          monitorEntryTime(searchPatente); // Iniciar monitoreo al buscar los datos
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

  const monitorEntryTime = (patente) => {
    axios.get(`http://localhost:8081/parking/time/${patente}`)
      .then(response => {
        if (response.data.status === 'success') {
          const entryData = response.data.data;
          console.log('entryData:', entryData);

          if (!entryData.patente || !entryData.estacionamiento || !entryData.created_at) {
            console.error('Error: Datos incompletos en la respuesta del servidor.');
          }

          console.log('Tiempo', entryData.created_at);

          const entryPatente = entryData.patente;
          const entryTime = new Date(entryData.created_at);
          const currentTime = new Date();
          const timeElapsed = currentTime - entryTime;
          console.log('Patente:', entryPatente);
          console.log('Estacionamiento:', entryData.estacionamiento);
          const timeRemaining = 10 * 1000 - timeElapsed; // 2 minutos en milisegundos

          if (timeRemaining > 0) {
            setTimeout(() => {
              alert(`Han pasado 10 segundos desde que el vehículo con patente ${entryPatente} ingresó. Está usando el estacionamiento ${entryData.estacionamiento}.`);
            }, timeRemaining);
          } else {
            alert(`Han pasado más de 10 segundos desde que el vehículo con patente ${entryPatente} ingresó. Está usando el estacionamiento ${entryData.estacionamiento}.`);
          }

        } else {
          console.error('Error: No se encontró la hora de ingreso del vehículo.');
        }
      })
      .catch(error => {
        console.error('Error al obtener la hora de ingreso:', error);
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
                      <Form.Control
                      type="text"
                      placeholder={t('getPlate')}
                      value={searchPatente}
                      onChange={(e) => setSearchPatente(e.target.value)}
                      required
                      aria-label="Large"
                      aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <button className='card-button mb-5' type='submit'>{t('search')}</button>
                  </Form.Group>
                </Form>
                <div className=' d-flex justify-content-center'>
                  {searchResult && (
                    <div className='alert alert-success'>
                      <h4 className='d-flex justify-content-center'><strong>{t('results')}</strong></h4>
                      {sourceTable === 'parking' ? (
                          <>
                            <p><strong>{t('nameParking')}</strong> {searchResult.nombre}</p>
                            <p><strong>{t('departmentParking')}</strong> {searchResult.departamento}</p>
                            <p><strong>{t('parkingParking')}</strong> {searchResult.estacionamiento}</p>
                            <p><strong>{t('arrivalTime')}</strong> {searchResult.created_at}</p>
                          </>
                        ) : sourceTable === 'frequent_visits' ? (
                          <>
                            <p><strong>{t('nameParking')}</strong> {searchResult.name}</p>
                            <p><strong>{t('RUT')}</strong> {searchResult.rut}</p>
                            <p><strong>{t('apartNum')} </strong> 
                            {searchResult.department}</p>
                            <h4 className='text-center'>{t('frequentVisit')}</h4>
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
                      <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder={t('enterName')}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                    </InputGroup>
                    <InputGroup className='mb-3' controlId='patente'>
                      <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faCar} /></InputGroup.Text>
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder={t('getPlate')}
                        value={patente}
                        onChange={(e) => setPatente(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className='mb-3' controlId='departamento'>
                      <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faBuilding} /></InputGroup.Text>
                      <Form.Control
                        size="lg"
                        type="number"
                        placeholder={t('getDepartment')}
                        value={departamento}
                        onChange={(e) => setDepartamento(e.target.value)}
                        required
                      />
                    </InputGroup>
                    <InputGroup className='mb-3' controlId='estacionamiento'>
                      <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faSquareParking} /></InputGroup.Text>
                      <Form.Control
                        size="lg"
                        type="number"
                        placeholder={t('getParking')}
                        value={estacionamiento}
                        onChange={(e) => setEstacionamiento(e.target.value)}
                        required
                      />
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
