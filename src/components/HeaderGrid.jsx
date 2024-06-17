import classNames from "classnames";
import ImageUpload from "../helpers/ImageUpload";
import { useOnSubmitHeader } from "./hooks/useOnSubmitHeader";
import { useState } from "react";
import { Table } from "./shared/Table";
import axios from "axios";
import { Input } from "./shared/Input";

const articlesField = {
  keys: ["id", "item01", "item02", "item03", "item04", "logo", "createdAt", "updatedAt"],
  labels: ["Id", "Item01", "Item02", "Item03", "Item04", "Logo", "Creado", "Actualizado"],
};

const styleLabel = "font-medium text-sm py-1 ";
const styleInput = "w-full h-[40px] px-2 text-slate-400 text-xs my-1 rounded-lg border bg-gray-100";

const callApi = async (page = 1, limit = 5) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/headers?page=${page}&limit=${limit}`,
    headers: {
      Accept: "application/json",
    },
  };
  const response = await axios.request(config);
  console.log(JSON.stringify(response.data, null, 4));
  return response.data;
};

function HeaderGrid() {

  // Hook personalizado para manejar las solicitudes fetch
  const { handleFileChange, onSubmit, register, inputList, setInputList } = useOnSubmitHeader();

  const [showPopup, setShowPopup] = useState(false);
  const [counter, setCounter] = useState(1)

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const addItem = () => {
    setInputList([
      ...inputList,
      <Input key={inputList.length} number={inputList.length + 1} register={register} />,
    ]);
  };

  const removeItem = () => {
    if (inputList.length > 1) {
      setInputList(inputList.slice(0, -1));
    }
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
              <h1 className="text-2xl font-bold">Formulario de Items</h1>
              <button
                onClick={closePopup}
                className="text-gray-600 hover:text-gray-700 focus:outline-none"
              >
                X
              </button>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col font-sans">

              {inputList}

              {/* Logo */}
              <div className="my-2">
                <label htmlFor="file" className={classNames(styleLabel)}>
                  Ingrese el logo
                </label>
                <ImageUpload onFileChange={handleFileChange} />
              </div>

              <div className="mt-8">
                <div className="flex flex-col items-end space-y-4">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={removeItem}
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      Remover Item
                    </button>
                    <button
                      type="button"
                      // disabled={inputList.length === 1 ? true : false}
                      onClick={addItem}
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      Agregar Item
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Renderizar la tabla */}
      <div className="overflow-x-auto mx-4">
        <Table config={articlesField} source={callApi} page={counter} />
      </div>
      <div className="flex justify-end items-center px-4 py-2 bg-white shadow-md mb-4 mt-4">
        <div className="flex items-center space-x-4">
          <button
            disabled={counter === 1 ? true : false}
            onClick={() => setCounter(counter - 1)}
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline">prev</button>
          <div>{counter}</div>
          <button
            onClick={() => setCounter(counter + 1)}
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline">next</button>
        </div>
      </div>
    </div>
  );
}

export default HeaderGrid;
