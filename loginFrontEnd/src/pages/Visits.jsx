import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PageHeading from '../components/PageHeading';
import './Visits.css';
import { useTranslation } from 'react-i18next';

function Visits() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    rut: ''
  });
  const [isFrequent, setIsFrequent] = useState(null);
  const [visitorData, setVisitorData] = useState({
    name: '',
    birthdate: '',
    rut: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/visitas/frequent', formData);
      alert('Visita frecuente agregada exitosamente');
    } catch (error) {
      alert('Error al agregar visita frecuente');
    }
  };

  const handleScan = async (rut) => {
    try {
      const response = await axios.get(`http://localhost:8081/visitas/check/${rut}`);
      if (response.data.isFrequent) {
        setIsFrequent(true);
        setVisitorData(response.data.visitor);
      } else {
        setIsFrequent(false);
      }
    } catch (error) {
      alert('Error al verificar visita');
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/visitas/register', visitorData);
      alert('Visita registrada exitosamente');
    } catch (error) {
      alert('Error al registrar visita');
    }
  };

  const handleVisitorChange = (e) => {
    const { name, value } = e.target;
    setVisitorData({ ...visitorData, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className="visits-container">
          <h1 className="visits-mt-5 visits-h1">Registro de Visitas</h1>
          <div className="visits-mt-4">
            <h2 className="visits-h2">Agregar Visita Frecuente</h2>
            <form onSubmit={handleSubmit}>
              <div className="visits-form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  className="visits-form-control visits-input"
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="visits-form-group">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  className="visits-form-control visits-input"
                  name="birthdate"
                  placeholder="Fecha de nacimiento"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="visits-form-group">
                <label>RUT</label>
                <input
                  type="text"
                  className="visits-form-control visits-input"
                  name="rut"
                  placeholder="RUT"
                  value={formData.rut}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="visits-btn visits-mt-3 visits-btn-primary">Agregar</button>
            </form>
          </div>
          <div className="visits-mt-5">
            <h2 className="visits-h2">Verificar Visita</h2>
            <div className="visits-form-group">
              <label>RUT</label>
              <input
                type="text"
                className="visits-form-control visits-input"
                placeholder="RUT"
                onBlur={(e) => handleScan(e.target.value)}
              />
            </div>
            {isFrequent === true && (
              <div className="alert alert-success visits-mt-3 visits-alert">
                <h3>Visita Frecuente</h3>
                <p>Nombre: {visitorData.name}</p>
                <p>Fecha de Nacimiento: {visitorData.birthdate}</p>
                <p>RUT: {visitorData.rut}</p>
              </div>
            )}
            {isFrequent === false && (
              <div className="visits-mt-3">
                <h3>Registrar Visita</h3>
                <form onSubmit={handleManualSubmit}>
                  <div className="visits-form-group">
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      className="visits-form-control visits-input"
                      name="name"
                      placeholder="Nombre completo"
                      value={visitorData.name}
                      onChange={handleVisitorChange}
                      required
                    />
                  </div>
                  <div className="visits-form-group">
                    <label>Fecha de nacimiento</label>
                    <input
                      type="date"
                      className="visits-form-control visits-input"
                      name="birthdate"
                      placeholder="Fecha de nacimiento"
                      value={visitorData.birthdate}
                      onChange={handleVisitorChange}
                      required
                    />
                  </div>
                  <div className="visits-form-group">
                    <label>RUT</label>
                    <input
                      type="text"
                      className="visits-form-control visits-input"
                      name="rut"
                      placeholder="RUT"
                      value={visitorData.rut}
                      onChange={handleVisitorChange}
                      required
                    />
                  </div>
                  <button type="submit" className="visits-btn visits-mt-3 visits-btn-primary">Registrar</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Visits;
