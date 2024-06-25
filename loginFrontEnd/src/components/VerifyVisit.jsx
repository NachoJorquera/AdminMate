import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

function VerifyVisit({ visitorData, handleVisitorChange, handleScan, isFrequent }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleScan}>
      <h2 className="card-title mb-4 text-center">{t('verifyVisits')}</h2>
      <div className="mb-3">
        <InputGroup className='mb-3' size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faIdCard} /></InputGroup.Text>
          <Form.Control
          type="text"
          name="rut"
          placeholder={t('enterRUT')}
          value={visitorData.rut}
          onChange={handleVisitorChange}
          required
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
      <div className='d-flex justify-content-center align-items-center'>
      {isFrequent !== null && (
        <div className={`mt-4 mb-5 alert ${isFrequent ? 'alert-success' : 'alert-danger'}`}>
          {isFrequent ? (
            <>
              <h3 className='d-flex justify-content-center mb-3'><strong>{t('frequentVisit')}</strong></h3>
              <p><strong>{t('name')}:</strong> {visitorData.name}</p>
              <p><strong>{t('RUT')}</strong> {visitorData.rut}</p>
              <p><strong>{t('birth')}:</strong> {new Date(visitorData.birthdate).toLocaleDateString()}</p>
              <p><strong>{t('apartNum')}</strong> {visitorData.department}</p>
              <p><strong>{t('plate')}</strong> {visitorData.patente || 'Patente no disponible'}</p>
              <p><strong>{t('arrivalTime')}</strong> {visitorData.ingreso}</p>
            </>
          ) : (
            <h4 className='d-flex justify-content-center'>Visita No Frecuente</h4>
          )}
        </div>
      )}
      </div>
      <div className='d-flex justify-content-center'>
        <button type="submit" className="card-button">{t('verify')}</button>
      </div>
    </form>
  )
}

export default VerifyVisit