import classNames from "classnames";
import { useForm } from "react-hook-form";
import { postMainArticle } from "../helpers/fetchMainArticle";
import { useState } from 'react';
import ImageUpload from "../helpers/ImageUpload";

const styleLabel = "text-red-500 py-1";
const styleInput =
  "rounded-md w-[500px] h-[40px] px-5 text-slate-400 text-sm italic my-1";

export default function MainArticleForm() {
  const { register, handleSubmit, reset, } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("textButton", data.textButton);
    formData.append("image", data.image[0]); // Assuming the field name for file is "image"

    try {
      const response = await postMainArticle(formData);
      // Assuming postMainArticle returns the URL of the uploaded image
      console.log(response); // Log the response from the server
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
    reset();
  });

  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (file) => {
      setImageFile(file);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col font-sans">
      {/* Titulo */}
      <label htmlFor="title" className={classNames(styleLabel)}>
        Ingrese el titulo
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo titulo"
        {...register("title")}
      />

      {/* Descripcion */}
      <label htmlFor="descripcion" className={classNames(styleLabel)}>
        Ingrese la descripción
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese la Descripción"
        {...register("description")}
      />

      {/* Texto del boton */}
      <label htmlFor="text-btn" className={classNames(styleLabel)}>
        Ingrese el texto para el botón
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo texto del botón"
        {...register("textButton")}
      />

      {/* Fondo */}
      <label htmlFor="img" className={classNames(styleLabel)}>
        Seleccione el nuevo fondo a utilizar
      </label>

      <ImageUpload onFileChange={handleFileChange} />

      <button type="submit">Enviar</button>

    </form>
  );
}
