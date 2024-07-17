import React, { useState } from 'react'
import StepOne from '../StepForm/StepOne'
import StepTwoPrueba from './StepTwoEdit';

const fields = [
  { type: 'text', name: 'nombreCurso', label: 'Nombre del Curso' },
  { type: 'text', name: 'descripcionCurso', label: 'Descripción' },
  {
    type: 'select', name: 'categoria', label: 'Categoría', options: [
      { value: '', label: 'Seleccionar' },
      { value: 'programming', label: 'Programación' },
      { value: 'design', label: 'Diseño' },
      { value: 'marketing', label: 'Marketing' }
    ]
  },
  {
    type: 'select', name: 'estatus', label: 'Estatus', options: [
      { value: '', label: 'Seleccionar' },
      { value: 'active', label: 'Activo' },
      { value: 'inactive', label: 'Inactivo' }
    ]
  },
  {
    type: 'select', name: 'nivel', label: 'Nivel', options: [
      { value: '', label: 'Seleccionar' },
      { value: 'principiante', label: 'Principiante' },
      { value: 'medio', label: 'Intermedio' },
      { value: 'avanzado', label: 'Avanzado' }
    ]
  },
  { type: 'file', name: 'fotografiaDelCurso', label: 'Portada del Curso' }
];

const videos = [
  {
    id: 1,
    title: "Video 1",
    fields: [
      { label: 'Nombre', name: 'name', type: 'text' },
      { label: 'Duración', name: 'duration', type: 'number' },
      { label: 'Categoría', name: 'category', type: 'select', options: [{ value: 'cat1', label: 'Categoría 1' }, { value: 'cat2', label: 'Categoría 2' }] },
      { label: 'Archivo', name: 'file', type: 'file' },
      { label: 'Miniatura', name: 'file', type: 'file' },
      { label: 'Material', name: 'button', type: 'button' }
    ]
  },
  {
    id: 2,
    title: "Video 2",
    fields: [
      { label: 'Nombre', name: 'name', type: 'text' },
      { label: 'Duración', name: 'duration', type: 'number' },
      { label: 'Categoría', name: 'category', type: 'select', options: [{ value: 'cat1', label: 'Categoría 1' }, { value: 'cat2', label: 'Categoría 2' }] },
      { label: 'Archivo', name: 'file', type: 'file' },
      { label: 'Miniatura', name: 'file', type: 'file' },
      { label: 'Material', name: 'button', type: 'button' }
    ]
  },
  {
    id: 3,
    title: "Video 3",
    fields: [
      { label: 'Nombre', name: 'name', type: 'text' },
      { label: 'Duración', name: 'duration', type: 'number' },
      { label: 'Categoría', name: 'category', type: 'select', options: [{ value: 'cat1', label: 'Categoría 1' }, { value: 'cat2', label: 'Categoría 2' }] },
      { label: 'Archivo', name: 'file', type: 'file' },
      { label: 'Miniatura', name: 'file', type: 'file' },
      { label: 'Material', name: 'button', type: 'button' }

    ]
  },
];


export const CursosEdit = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    videos: []
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleAddVideo = (video) => {
    setFormData({
      ...formData,
      videos: [...formData.videos, video]
    });
  };

  const handleUpdateVideo = (videoId, updatedVideo) => {
    console.log('Video actualizado')
  };
  return (
    <>
      <div className='bg-white shadow-md rounded-lg  '>
        <StepOne title='Editar curso' fields={fields} nextStep={nextStep} handleChange={handleChange} handleFileChange={handleFileChange} formData={formData} showButton={false} />
        <StepTwoPrueba videos={videos}
          handleUpdateVideo={handleUpdateVideo}
          prevStep={() => console.log('Anterior')}
          nextStep={() => console.log('Siguiente')} />

        <div className='flex justify-end p-4'>
          <button
            onClick={() => console.log('Creado')}
            className="px-4 py-2 bg-green-600 text-white rounded-md "
          >
            Confirmar y Crear Curso
          </button>
        </div>
      </div>



    </>

  )
}


