import React from 'react';
import MultiStepForm from './shared/MultiStepForm';

export const VideoForm = () => {
  const steps = [
    {
      title: "Crear Curso",
      fields: [
        { name: 'courseName', label: 'Nombre del Curso', type: 'text' },
        { name: 'courseDescription', label: 'Descripción', type: 'text' },
        { name: 'category', label: 'Categoría', type: 'select', options: [
          { value: '', label: 'Seleccionar' },
          { value: 'programming', label: 'Programación' },
          { value: 'design', label: 'Diseño' },
          { value: 'marketing', label: 'Marketing' }
        ]},
        { name: 'status', label: 'Estatus', type: 'select', options: [
          { value: '', label: 'Seleccionar' },
          { value: 'active', label: 'Activo' },
          { value: 'inactive', label: 'Inactivo' }
        ]},
        { name: 'level', label: 'Nivel', type: 'select', options: [
          { value: '', label: 'Seleccionar' },
          { value: 'beginner', label: 'Principiante' },
          { value: 'intermediate', label: 'Intermedio' },
          { value: 'advanced', label: 'Avanzado' }
        ]},
        { name: 'coverImage', label: 'Portada del Curso', type: 'file' }
      ]
    },
    {
      title: "Agregar Video",
      fields: [
        { name: 'videoName', label: 'Nombre del Video', type: 'text' },
        { name: 'videoDescription', label: 'Descripción', type: 'text' },
        { name: 'material', label: 'Material', type: 'button', onClick: () => alert('Subir Material') },
        { name: 'thumbnail', label: 'Miniatura del Video', type: 'file' },
        { name: 'videoFile', label: 'Subir Video', type: 'file' },
        { name: 'videoStatus', label: 'Estatus', type: 'select', options: [
          { value: '', label: 'Seleccionar' },
          { value: 'active', label: 'Activo' },
          { value: 'inactive', label: 'Inactivo' }
        ]}
      ]
    },
    {
     title: "Revisión del Curso",
      fields: [
        // No fields here, just review of the collected data
      ]
    } 
  ];

  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">Formulario de Creación de Curso</h1>
      <MultiStepForm steps={steps} />
    </div>
  );
};




