import React from 'react';

const FormStep = ({ stepData, handleChange, handleFileChange, prevStep, nextStep, isLastStep, handleAddVideo }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">{stepData.title}</h2>
      {stepData.fields.map((field, index) => (
        <div key={index}>
          <label className="block text-sm font-medium">{field.label}</label>
          {field.type === 'text' && (
            <input 
              type="text" 
              name={field.name} 
              value={field.value}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          )}
          {field.type === 'select' && (
            <select 
              name={field.name} 
              value={field.value}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              {field.options.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </select>
          )}
          {field.type === 'file' && (
            <input 
              type="file" 
              name={field.name} 
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          )}
          {field.type === 'button' && (
            <button 
              type="button"
              onClick={field.onClick}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200"
            >
              {field.label}
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-between mt-4">
        {stepData.hasPrev && (
          <button 
            onClick={prevStep}
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            Anterior
          </button>
        )}
        {stepData.title === 'Agregar Video' && (
          <button 
            onClick={handleAddVideo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Agregar Video
          </button>
        )}
        {isLastStep ? (
          <button 
            onClick={nextStep}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Confirmar y Crear Curso
          </button>
        ) : (
          <button 
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default FormStep;
