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
          onChange={(e) => handleChange(e, 'nombreCurso')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <input 
          type="text" 
          name="descripcionCurso" 
          value={formData.descripcionCurso}
          onChange={(e) => handleChange(e, 'descripcionCurso')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Categoría</label>
        <input
          type="text"
          name="categoria" 
          value={formData.categoria}
          onChange={(e) => handleChange(e, 'categoria')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Estatus</label>
        <input
          type="text"
          name="estatus" 
          value={formData.estatus}
          onChange={(e) => handleChange(e, 'estatus')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Nivel</label>
        <input
          type="text"
          name="nivel" 
          value={formData.nivel}
          onChange={(e) => handleChange(e, 'nivel')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
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
