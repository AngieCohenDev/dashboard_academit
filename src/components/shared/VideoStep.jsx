import React, { useState } from 'react';
import StepOne from './FormStep/StepOne';
import StepTwo from './FormStep/StepTwo';
import StepThree from './FormStep/StepThree';
import { useFormCurso } from '../../components/hooks/useVideoLocic';

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

  const handleChange = (e, id) => {
    updateFormData({ [id]: e.target.value });
    if (errors[id]) {
      setErrors({ ...errors, [id]: '' });
    }
  };

  const handleFileChange = (e) => {
    updateFormData({ [e.target.name]: e.target.files[0] });
  };

  const handleAddVideo = (video) => {
    addVideoData(video);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await submitFormData();
    if (response.type !== 'unsuccess') {
      alert('Curso creado exitosamente');
    } else {
      alert('Ocurrió un error: ' + response.message);
    }
  };

  if (isSubmitting) {
    return <div>Enviando...</div>;
  }

  return (
    <>
      {error && <div>{error}</div>}
      {step === 1 && (
        <StepOne
          nextStep={nextStep}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          formData={formData}
        />
      )}
      {step === 2 && (
        <StepTwo
          nextStep={nextStep}
          prevStep={prevStep}
          handleAddVideo={handleAddVideo}
        />
      )}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <StepThree prevStep={prevStep} formData={formData} />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};
