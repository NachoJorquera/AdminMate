import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faUser, faBuilding, faIdCard, faCakeCandles } from "@fortawesome/free-solid-svg-icons";

function VisitsForm({ formData, handleChange, handleSubmit, title }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className="visits-form">
      <h2 className="card-title text-center mb-4">{title}</h2>
      
      <div className="mb-3">
        <InputGroup className='mb-4' size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
          <Form.Control 
            type="text"
            name="name"
            placeholder={t('enterName')}
            value={formData.name}
            onChange={handleChange}
            required
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
      <div className="mb-3">
        <InputGroup className='mb-3' size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faIdCard} /></InputGroup.Text>
          <Form.Control
          type="text"
          name="rut"
          placeholder={t('enterRUT')}
          value={formData.rut}
          onChange={handleChange}
          required
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
      <div className="mb-3">
        <label className="form-label">{t('enterBirth')}</label>
        <InputGroup className='mb-4' size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faCakeCandles} /></InputGroup.Text>
          <Form.Control
          type="date"
          name="birthdate"
          placeholder={t('enterName')}
          value={formData.birthdate}
          onChange={handleChange}
          required
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
      <div className="mb-3">
        <InputGroup className='mb-4' size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faBuilding} /></InputGroup.Text>
          <Form.Control 
            type="text"
            name="department"
            placeholder={t('getDepartment')}
            value={formData.department}
            onChange={handleChange}
            required
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
      <div className="mb-3">
        <label className="form-label">{t('ifApplies')}</label>
        <InputGroup className='mb-4' size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faCar} /></InputGroup.Text>
          <Form.Control
          type="text"
          name="patente"
          placeholder={t('getPlate')}
          value={formData.patente}
          onChange={handleChange}
          required
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
      <div className='d-flex justify-content-center'>
        <button type="submit" className="card-button">{t('add')}</button>
      </div>
    </form>
  )
}

export default VisitsForm