import React from 'react';

const StepOne = ({
  title,
  fields,
  nextStep,
  handleChange,
  handleFileChange,
  formData,
  buttonText = "Siguiente",
  showButton = true // Prop para mostrar u ocultar el botón
}) => {

  return (
    <div className="py-8 px-8 w-full mx-auto h-3/5 bg-white space-y-4">
      <h2 className="text-xl font-bold mb-5">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium">{field.label}</label>
            {field.type === 'text' && (
              <input 
                type="text" 
                name={field.name} 
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 mb-3 block w-full p-2 border border-gray-300 rounded-md"
              />
            )}
            {field.type === 'select' && (
              <select 
                name={field.name} 
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
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
          </div>
        ))}
      </div>
      {showButton && (
        <button 
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default StepOne;
