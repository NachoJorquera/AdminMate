import React from 'react';
import '../pages/Visits.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerifyVisit = ({ visitorData, handleVisitorChange, handleScan, isFrequent }) => (
  <div className='d-grid justify-content-center align-items-center'>
    <div className="p-4 d-grid justify-content-center align-items-center">
    <h2 className="mb-4">Verificar Visita</h2>
    <form onSubmit={handleScan}>
      <div className="mb-3">
        <label className="form-label">RUT</label>
        <input
          type="text"
          className="form-control"
          name="rut"
          value={visitorData.rut}
          onChange={handleVisitorChange}
          required
        />
      </div>
    </form>
    {isFrequent !== null && (
      <div className={`mt-4 alert ${isFrequent ? 'alert-success' : 'alert-danger'}`}>
        {isFrequent ? (
          <>
            <h3>Visita Frecuente</h3>
            <p>Número de Departamento: {visitorData.department}</p>
            <p>Nombre: {visitorData.name}</p>
            <p>Fecha de Nacimiento: {new Date(visitorData.birthdate).toLocaleDateString()}</p>
            <p>RUT: {visitorData.rut}</p>
            <p>Patente: {visitorData.patente || 'Patente no disponible'}</p>
            <p>Hora de Ingreso: {visitorData.ingreso}</p>
          </>
        ) : (
          <p>Visita no frecuente</p>
        )}
      </div>
    )}
  </div>
  <div className='d-flex justify-content-center'>
        <button type="submit" className="card-button">Verificar</button>
      </div>
  </div>
  
);

export default VerifyVisit;