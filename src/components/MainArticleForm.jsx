import classNames from "classnames";
import { useForm } from "react-hook-form";
import { postMainArticle } from "../helpers/fetchMainArticle";
import { useState } from 'react';
import ImageUpload from "../helpers/ImageUpload";
import { useOnSubmitMainArticle } from "./hooks/useOnSubmitMainArticle";

const styleLabel = "font-medium text-sm py-1 ";
const styleInput = "w-full h-[40px] px-2 text-slate-400 text-xs my-1 rounded-lg border bg-gray-100";

export default function MainArticleForm() {
  
  const { handleFileChange, onSubmit, register} = useOnSubmitMainArticle()
  
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-2/5 h-3/5 mx-4">
        <div className="mb-6">
          <h1 className="text-2xl flex items-center justify-center font-bold">Formulario main article</h1>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col font-sans">

          <div className="my-2">
            {/* Titulo */}
            <label htmlFor="title" className={classNames(styleLabel)}>
              Ingrese el titulo
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el titulo"
              {...register("title")}
            />
          </div>

          <div className="my-2">
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
          </div>

          <div className="my-2">
            {/* Texto del boton */}
            <label htmlFor="text-btn" className={classNames(styleLabel)}>
              Ingrese el texto para el botón
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el texto del botón"
              {...register("textButton")}
            />
          </div>

          <div className="my-2">
            {/* Fondo */}
            <label htmlFor="img" className={classNames(styleLabel)}>
              Seleccione el fondo
            </label>

            <ImageUpload onFileChange={handleFileChange} />
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
