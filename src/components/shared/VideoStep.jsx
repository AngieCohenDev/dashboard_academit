import React, { useState } from 'react';
import {StepOne} from './StepForm/StepOne';
import {StepTwo} from './StepForm/StepTwo';
import StepThree from './StepForm/StepThree';

const fields = [
  { type: 'text', name: 'nombreCurso', label: 'Nombre del Curso', required: true },
  { type: 'text', name: 'descripcionCurso', label: 'Descripción', required: true },
  { type: 'select', name: 'categoria', label: 'Categoría',required: true, options: [
    { value: '', label: 'Seleccionar' },
    { value: 'programming', label: 'Programación' },
    { value: 'design', label: 'Diseño' },
    { value: 'marketing', label: 'Marketing' }
  ]},
  { type: 'select', name: 'estatus', label: 'Estatus', options: [
    { value: '', label: 'Seleccionar' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ]},
  { type: 'select', name: 'nivel', label: 'Nivel', options: [
    { value: '', label: 'Seleccionar' },
    { value: 'principiante', label: 'Principiante' },
    { value: 'medio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' }
  ]},
  { type: 'file', name: 'fotografiaDelCurso', label: 'Portada del Curso' }
];

export const VideoStep = () => {
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

  const goToStepOne = () => {
    setStep(1);
    window.location.reload();
  };

  switch(step) {
    case 1:
      return <StepOne title='Crear Cursos' fields={fields} nextStep={nextStep} handleChange={handleChange} handleFileChange={handleFileChange} formData={formData}  />;
    case 2:
      return <StepTwo nextStep={nextStep} prevStep={prevStep} handleAddVideo={handleAddVideo} showNextButton={true} showPrevButton={true} />;
    case 3:
      return <StepThree prevStep={prevStep} formData={formData} goToStepOne={goToStepOne} />;
    default:
      return <div>Error</div>;
  }
};


