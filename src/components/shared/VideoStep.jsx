import React, { useState } from 'react';
import StepOne from './StepForm/StepOne';
import StepTwo from './StepForm/StepTwo';
import StepThree from './StepForm/StepThree';

export const VideoStep = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    category: '',
    status: '',
    level: '',
    coverImage: null,
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

  switch(step) {
    case 1:
      return <StepOne nextStep={nextStep} handleChange={handleChange} handleFileChange={handleFileChange} formData={formData} />;
    case 2:
      return <StepTwo nextStep={nextStep} prevStep={prevStep} handleAddVideo={handleAddVideo} />;
    case 3:
      return <StepThree prevStep={prevStep} formData={formData} />;
    default:
      return <div>Error</div>;
  }
};


