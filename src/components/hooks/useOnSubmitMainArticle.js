/*import { useForm } from "react-hook-form";
import { solicitudFetch } from "../../helpers/solicitudesFetch";
import { useState } from "react";

export const useOnSubmitMainArticle = () => {

    const { register, handleSubmit, reset, } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const handleFileChange = (file) => {
        setImageFile(file);
    };

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        //creamos una variabe "fields" en donde pondremos el nombre de cada uno de los inputs
        const fields = ['title', 'description', 'textButton'];
        //creamos un contador que empieza en cero, esto para determinar si se llamara a POST o PATCH
        let itemCount = 0;

        //a la variable fields le aplicamos el metodo forEach para ir agregado al formData el nombre de cada 
        //dato en fields y el value que nos envian desde data
        fields.forEach(field => {
            if (data[field] !== "") {
                formData.append(field, data[field]);
                itemCount++;
            }
        });

        if (imageFile !== null) {
            formData.append("image", imageFile);
            itemCount++;
            setImageFile(null)
        }

        if (itemCount === 4) {
            try {
                await solicitudFetch(formData, 'POST', 'main-article');
                reset();
                return;
            } catch (error) {
                console.error("Error:", error);
            }
            reset();
        } else {
            try {
                const { id } = await solicitudFetch(undefined, 'GET','main-article');
                await solicitudFetch(formData, 'PATCH','main-article', id);
                reset();
                return;
            } catch (error) {
                console.error("Error:", error);
            }
            reset();
        }
    });

    return {
        handleFileChange,
        onSubmit,
        register
    }



}*/
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "../shared/Input";

export const useOnSubmitMainArticle = () => {
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

