import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { StepOne } from './StepForm/StepOne';
import { StepTwo } from './StepForm/StepTwo';
import StepThree from './StepForm/StepThree';

const fields = [
  { type: 'text', name: 'nombreCurso', label: 'Nombre del Curso', required: true },
  { type: 'text', name: 'descripcionCurso', label: 'Descripción', required: true },
  { type: 'select', name: 'categoria', label: 'Categoría', required: true, options: [
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

export const VideoStep = ({ isOpen, closePopup }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombreCurso: '',
    descripcionCurso: '',
    categoria: '',
    estatus: '',
    nivel: '',
    fotografiaDelCurso: null,
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

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <StepOne
            title="Crear Cursos"
            fields={fields}
            nextStep={nextStep}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            formData={formData}
          />
        );
      case 2:
        return (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            handleAddVideo={handleAddVideo}
            showNextButton={true}
            showPrevButton={true}
          />
        );
      case 3:
        return (
          <StepThree
            prevStep={prevStep}
            formData={formData}
            goToStepOne={goToStepOne}
          />
        );
      default:
        return <div>Error</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={closePopup} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-4/5 h-1/2 data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex justify-end">
                <button onClick={closePopup} className="text-gray-600 hover:text-gray-700 focus:outline-none">
                  X
                </button>
              </div>
              <div>
                {renderStep()}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default VideoStep;
