import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "../shared/Input";

export const useOnSubmitHeader = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [inputList, setInputList] = useState([<Input key={0} number={1} register={register} />]);

  const handleFileChange = (file) => {
    setImageFile(file);
  };

  const resetForm = () => {
    reset(); // Reset react-hook-form fields
    setImageFile(null); // Clear image file
    setInputList([<Input key={0} number={1} register={register} />]); // Reset input list
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    const fields = Object.keys(data);

    fields.forEach((field) => {
      formData.append(field, data[field]);
    });

    if (imageFile !== null) {
      formData.append("logo", imageFile);
      setImageFile(null);
    }

    // Para ver cada uno de los datos enviados en el form data.
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      // Asume que 'solicitudFetch' es una función que envía la solicitud
      // await solicitudFetch(formData, 'POST', 'headers');
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  });

  return {
    handleFileChange,
    onSubmit,
    register,
    inputList,
    setInputList,
    resetForm
  };
};
