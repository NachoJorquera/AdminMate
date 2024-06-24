import React from 'react';
import '../pages/Visits.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerifyVisit = ({ visitorData, handleVisitorChange, handleScan, isFrequent }) => (
  <div className="card p-4 shadow-sm">
    <h2 className="text-center mb-4">Verificar Visita</h2>
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
      <button type="submit" className="btn btn-primary w-100">Verificar</button>
    </form>
    {isFrequent !== null && (
      <div className={`mt-4 alert ${isFrequent ? 'alert-success' : 'alert-danger'}`}>
        {isFrequent ? (
          <>
            <h3>Visita Frecuente</h3>
            <p>NÃºmero de Departamento: {visitorData.department}</p>
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
);

export default VerifyVisit;