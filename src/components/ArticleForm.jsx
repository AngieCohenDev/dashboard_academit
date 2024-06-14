import React, { useState } from "react";
import classNames from "classnames";
import ImageUpload from "../helpers/ImageUpload";
import axios from "axios";
import { useOnSubmitArticle } from "./hooks/useOnSubmitArticles";
import { Table } from "./shared/Table";

const articlesField = {
  keys: ["title", "id", "description", "image", "createdAt", "updatedAt"],
  labels: ["Titulo", "Id", "Descripcion", "Imagen", "Creado", "Actualizado"],
};

const styleLabel = "font-medium text-sm py-1";
const styleInput =
  "w-full h-10 px-2 text-slate-400 text-sm my-1 rounded-lg border bg-gray-100";

export default function ArticleForm() {
  const { handleFileChange, onSubmit, register } = useOnSubmitArticle();

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const callApi = async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/articulos",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data, null, 4));
    return response.data;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Botón para abrir el popup */}
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md mb-4">
        <input
          type="text"
          className="w-1/3 h-10 px-2 text-slate-400 text-sm my-1 rounded-lg border bg-gray-100"
          placeholder="Buscar..."
        />
        <button
          onClick={openPopup}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Abrir Formulario
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-75">
          <div className="bg-white shadow-md rounded-lg p-8 w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Formulario de Artículo</h1>
              <button
                onClick={closePopup}
                className="text-gray-600 hover:text-gray-700 focus:outline-none"
              >
                X
              </button>
            </div>
            <form onSubmit={onSubmit} className="font-sans">
              <div className="my-4">
                <label htmlFor="title" className={classNames(styleLabel)}>
                  Ingrese el título
                </label>
                <input
                  className={classNames(styleInput)}
                  type="text"
                  placeholder="Por favor ingrese el título"
                  {...register("title")}
                />
              </div>

              <div className="my-4">
                <label
                  htmlFor="descripcion"
                  className={classNames(styleLabel)}
                >
                  Ingrese la descripción
                </label>
                <input
                  className={classNames(styleInput)}
                  type="text"
                  placeholder="Por favor ingrese la descripción"
                  {...register("description")}
                />
              </div>

              <div className="my-4">
                <label htmlFor="img" className={classNames(styleLabel)}>
                  Seleccione imagen
                </label>
                <ImageUpload onFileChange={handleFileChange} />
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Renderizar la tabla */}
      <div className="overflow-x-auto mx-4">
        <Table config={articlesField} source={callApi} />
      </div>
    </div>
  );
}
