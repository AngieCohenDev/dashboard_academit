import React from 'react';

const StepOne = ({ nextStep, handleChange, handleFileChange, formData }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Crear Curso</h2>
      <div>
        <label className="block text-sm font-medium">Nombre del Curso</label>
        <input 
          type="text" 
          name="nombreCurso" 
          value={formData.nombreCurso}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <input 
          type="text" 
          name="descripcionCurso" 
          value={formData.descripcionCurso}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Categoría</label>
        <select 
          name="categoria" 
          value={formData.categoria}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccionar</option>
          <option value="programming">Programación</option>
          <option value="design">Diseño</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Estatus</label>
        <select 
          name="estatus" 
          value={formData.estatus}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccionar</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Nivel</label>
        <select 
          name="nivel" 
          value={formData.nivel}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccionar</option>
          <option value="principiante">Principiante</option>
          <option value="medio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Portada del Curso</label>
        <input 
          type="file" 
          name="fotografiaDelCurso" 
          onChange={handleFileChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button 
        onClick={nextStep}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Siguiente
      </button>
    </div>
  );
};

export default StepOne;
