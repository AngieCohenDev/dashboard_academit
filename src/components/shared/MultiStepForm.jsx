import React, { useState } from 'react';
import FormStep from './FormStep/FormStep';

const MultiStepForm = ({ steps }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    steps.forEach(step => {
      step.fields.forEach(field => {
        initialData[field.name] = '';
      });
    });
    initialData['videos'] = [];
    return initialData;
  });

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      alert('Curso creado exitosamente!');
    }
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

  const handleAddVideo = () => {
    const newVideo = {
      videoName: formData.videoName,
      videoDescription: formData.videoDescription,
      material: formData.material,
      thumbnail: formData.thumbnail,
      videoFile: formData.videoFile,
      status: formData.videoStatus
    };

    setFormData(prevFormData => ({
      ...prevFormData,
      videos: [...prevFormData.videos, newVideo],
      videoName: '',
      videoDescription: '',
      material: '',
      thumbnail: null,
      videoFile: null,
      videoStatus: ''
    }));
  };

  const isLastStep = step === steps.length - 1;

  return (
    <div>
      <FormStep 
        stepData={steps[step]}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        prevStep={prevStep}
        nextStep={nextStep}
        isLastStep={isLastStep}
        handleAddVideo={handleAddVideo}
      />

      {isLastStep && (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-4">
          <h2 className="text-xl font-bold">Revisión del Curso</h2>
          <div>
            <p><strong>Nombre del Curso:</strong> {formData.courseName}</p>
            <p><strong>Descripción:</strong> {formData.courseDescription}</p>
            <p><strong>Categoría:</strong> {formData.category}</p>
            <p><strong>Estatus:</strong> {formData.status}</p>
            <p><strong>Nivel:</strong> {formData.level}</p>
            <p><strong>Portada del Curso:</strong> {formData.coverImage?.name}</p>
            <h3 className="text-lg font-bold mt-4">Videos</h3>
            {formData.videos.map((video, index) => (
              <div key={index} className="mt-2">
                <p><strong>Nombre del Video:</strong> {video.videoName}</p>
                <p><strong>Descripción del Video:</strong> {video.videoDescription}</p>
                <p><strong>Material:</strong> {video.material}</p>
                <p><strong>Miniatura:</strong> {video.thumbnail?.name}</p>
                <p><strong>Video:</strong> {video.videoFile?.name}</p>
                <p><strong>Estatus:</strong> {video.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
