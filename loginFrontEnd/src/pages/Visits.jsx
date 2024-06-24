import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PageHeading from '../components/PageHeading';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormFrequentVisit from '../components/FormFrequentVisit';
import FormNonFrequentVisit from '../components/FormNonFrequentVisit';
import VerifyVisit from '../components/VerifyVisit';
import './Visits.css';

function Visits() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    department: '',
    name: '',
    birthdate: '',
    rut: '',
    patente: ''
  });
  const [isFrequent, setIsFrequent] = useState(null);
  const [visitorData, setVisitorData] = useState({
    department: '',
    name: '',
    birthdate: '',
    rut: '',
    patente: '',
    ingreso: ''
  });
  const [visitType, setVisitType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVisitorChange = (e) => {
    const { name, value } = e.target;
    setVisitorData({ ...visitorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = visitType === 'frequent' ? 'http://localhost:8081/visitas/frequent' : 'http://localhost:8081/visitas/register';
    try {
      await axios.post(url, formData);
      alert(visitType === 'frequent' ? 'Visita frecuente agregada exitosamente' : 'Visita registrada exitosamente');
      setFormData({ department: '', name: '', birthdate: '', rut: '', patente: '' });
    } catch (error) {
      alert('Error al agregar visita');
    }
  };

  const handleScan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8081/visitas/check/${visitorData.rut}`);
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

  return (
    <>
      <Navbar />
      <PageHeading>{t('Registro de Visitas')}</PageHeading>
        <div className="container visits-container">
          <div className="btn-container d-flex justify-content-center mb-4">
            <button className="btn btn-primary mx-2" onClick={() => setVisitType('frequent')}>Visitas Frecuentes</button>
            <button className="btn btn-secondary mx-2" onClick={() => setVisitType('non-frequent')}>Otras Visitas</button>
            <button className="btn btn-info mx-2" onClick={() => setVisitType('verify')}>Verificar Visitas</button>
          </div>
          <div className="d-flex justify-content-center">
            {visitType === 'frequent' && (
              <FormFrequentVisit
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
            {visitType === 'non-frequent' && (
              <FormNonFrequentVisit
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
            {visitType === 'verify' && (
              <VerifyVisit
                visitorData={visitorData}
                handleVisitorChange={handleVisitorChange}
                handleScan={handleScan}
                isFrequent={isFrequent}
              />
            )}
          </div>
        </div>
    </>
  );
}

export default Visits;