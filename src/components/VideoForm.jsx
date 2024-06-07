import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useState } from "react";
import VideoUpload from "../helpers/VideoUpload";

const styleLabel = "font-medium text-sm py-1 ";
const styleInput = "w-full h-[40px] px-2 text-slate-400 text-xs my-1 rounded-lg border bg-gray-100";

export default function VideoForm() {
  const { register, handleSubmit, reset, watch } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (file) => {
    setVideoFile(file);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-2/5 h-3/5 mx-4">
        <div className="mb-6">
          <h1 className="text-2xl flex items-center justify-center font-bold">Formulario curso</h1>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col font-sans">
          {/* Título */}
          <div className="my-2">
            <label htmlFor="title" className={classNames(styleLabel)}>
              Ingrese el título de la clase
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el título"
              {...register("title")}
            />
          </div>

          {/* Descripcion */}
          <div className="my-2">
            <label htmlFor="descripcion" className={classNames(styleLabel)}>
              Ingrese la descripción
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese la descripción"
              {...register("description")}
            />
          </div>

          {/* Video */}
          <div className="my-2">
            <label htmlFor="file" className={classNames(styleLabel)}>
              Seleccione el video
            </label>
            <VideoUpload onFileChange={handleFileChange} />
          </div>

          <button
            type="submit"
            className="self-center mt-6 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
