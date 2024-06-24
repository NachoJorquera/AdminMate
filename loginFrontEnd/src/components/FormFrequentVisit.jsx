import React from 'react';
import '../pages/Visits.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormFrequentVisit = ({ formData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="visits-form p-4">
    <h2 className="text-center mb-4">Agregar Visita Frecuente</h2>
    <div className="mb-3">
      <label className="form-label">Número de departamento</label>
      <input
        type="text"
        className="form-control"
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Nombre completo</label>
      <input
        type="text"
        className="form-control"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Fecha de nacimiento</label>
      <input
        type="date"
        className="form-control"
        name="birthdate"
        value={formData.birthdate}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label">RUT</label>
      <input
        type="text"
        className="form-control"
        name="rut"
        value={formData.rut}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Patente (si aplica)</label>
      <input
        type="text"
        className="form-control"
        name="patente"
        value={formData.patente}
        onChange={handleChange}
      />
    </div>
    <div className='d-flex justify-content-center'>
      <button type="submit" className="card-button">Agregar</button>
    </div>
  </form>
);

export default FormFrequentVisit;