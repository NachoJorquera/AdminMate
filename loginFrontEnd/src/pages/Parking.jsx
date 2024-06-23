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

  const { t } = useTranslation();

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

        <h3>Buscar datos por patente</h3>
          <Form className='espacio_abajo'>
            <Form.Group controlId="searchPatente">
              <Form.Label>Patente:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingresa la patente"
                value={searchPatente}
                onChange={(e) => setSearchPatente(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSearch}>
              Buscar
            </Button>
          </Form>
          {searchResult && (
            <div className='resultado'>
              <h4>Resultados:</h4>
              <p><strong>Nombre:</strong> {searchResult.nombre}</p>
              <p><strong>Apellido:</strong> {searchResult.apellido}</p>
              <p><strong>Departamento:</strong> {searchResult.departamento}</p>
              <p><strong>Estacionamiento:</strong> {searchResult.estacionamiento}</p>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingresa tu nombre" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="patente">
                  <Form.Label>Patente:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingresa la patente" 
                    value={patente}
                    onChange={(e) => setPatente(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                <Button variant="primary" type="submit">
              Enviar
            </Button>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="apellido">
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingresa tu apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="departamento">
                  <Form.Label>Departamento:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingresa el departamento"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="estacionamiento">
                  <Form.Label>Estacionamiento:</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Ingresa el número de estacionamiento"
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
