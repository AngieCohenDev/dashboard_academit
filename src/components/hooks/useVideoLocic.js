import { useState } from 'react';
import { createCurso } from '../../services/peticionesVideo';

export const useFormCurso = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const addVideoData = (video) => {
    setFormData((prevData) => ({
      ...prevData,
      videos: [...(prevData.videos || []), video],
    }));
  };

  const submitFormData = async () => {
    setIsSubmitting(true);
    try {
      const response = await createCurso(formData);
      setIsSubmitting(false);
      return response;
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateFormData,
    addVideoData,
    submitFormData,
    isSubmitting,
    error,
  };
};
