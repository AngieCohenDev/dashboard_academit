import classNames from "classnames";
import { useForm } from "react-hook-form";
import { postArticle } from "../helpers/fetchArticle";
import { useState } from 'react';
import ImageUpload from "../helpers/ImageUpload";

const styleLabel = "text-red-500 py-1";
const styleInput =
  "rounded-md w-[500px] h-[40px] px-5 text-slate-400 text-sm italic my-1";

export default function ArticleForm() {
  const { register, handleSubmit, reset, } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    postArticle(data)
    reset();
  });

  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (file) => {
      setImageFile(file);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col font-sans">
      {/* Título */}
      <label htmlFor="title" className={classNames(styleLabel)}>
        Ingrese el título
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo título"
        {...register("title")}
      />

      {/* Descripcion */}
      <label htmlFor="descripcion" className={classNames(styleLabel)}>
        Ingrese la descripción
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese la descripción"
        {...register("description")}
      />

      {/* Imagen */}
      <label htmlFor="img" className={classNames(styleLabel)}>
        Seleccione la nueva imagen a utilizar
      </label>
      <ImageUpload onFileChange={handleFileChange} />
      
      <button type="submit">Enviar</button>

    </form>
  );
}
