import React, { useState } from 'react';
import ItemFormPopup from '../FormCreation/FormCreation';

const Createfields = [
  { id: 'nombre', label: 'Título', type: 'text', required: true },
  { id: 'descripcionMaterial', label: 'Descripción', type: 'text', required: true },
  {
    type: 'select', name: 'estatus', label: 'Estatus', options: [
      { value: true, label: 'Activo' },
      { value: false, label: 'Inactivo' }
    ]
  },
  { id: 'archivoMaterial', label: 'Archivo', type: 'file', required: true },
];

export const StepTwo = ({ handleAddVideo, showPrevButton, showNextButton, prevStep, nextStep }) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [materialData, setMaterialData] = useState({
    nombre: '',
    descripcionMaterial: '',
    estatus: 'true',
    archivoMaterial: null
  })
  const [videoData, setVideoData] = useState({
    tituloVideo: '',
    descripcion: '',
    clase: '',
    archivoMiniatura: null,
    archivoVideo: null,
    estatus: '',
    materiales: []
  });

  const handleChange = (e) => {
    setVideoData({
      ...videoData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setVideoData({
      ...videoData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleAddMateriales = (material) => {
    setVideoData({
      ...videoData,
      materiales: [...videoData.materiales, material]
    });
  };

  const handleMaterialChange = (e) => {
    setMaterialData({
      ...materialData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileMaterialChange = (e) => {
    setMaterialData({
      ...materialData,
      [e.target.name]: e.target.files[0]
    });
  };

  const addMaterial = (e) => {
    e.preventDefault();
    handleAddMateriales(materialData);
    setMaterialData({
      nombre: '',
      descripcionMaterial: '',
      estatus: '',
      archivoMaterial: null
    })
  }

  const addVideo = () => {
    handleAddVideo(videoData);
    setVideoData({
      tituloVideo: '',
      descripcion: '',
      clase: '',
      archivoMiniatura: null,
      archivoVideo: null,
      estatus: '',
      materiales: []
    });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="p-7 w-full mx-auto h-3/4 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Agregar video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mt-3">Nombre del Video</label>
          <input
            type="text"
            name="tituloVideo"
            value={videoData.tituloVideo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mt-3">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={videoData.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mt-3">Clase</label>
          <input
            type="number"
            name="clase"
            value={videoData.clase}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Material</label>
          <button
            onClick={openPopup}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200"
          >
            Subir Material
          </button>
          {isPopupOpen && (
            <ItemFormPopup
              formAction={true}
              currentItem={materialData}
              handleFileChange={handleFileMaterialChange}
              handleChange={handleMaterialChange}
              handleFormSubmit={addMaterial}
              fields={Createfields}
              closePopup={closePopup} />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Miniatura del video</label>
          <input
            type="file"
            name="archivoMiniatura"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Subir video</label>
          <input
            type="file"
            name="archivoVideo"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Estatus</label>
          <select
            name="estatus"
            value={videoData.estatus}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between space-x-4 pt-7">
        {showPrevButton && (
          <button
            onClick={prevStep}
            className="px-4 py-2 w-[150px] bg-gray-600 hover:bg-gray-800 text-white rounded-md"
          >
            Anterior
          </button>
        )}
        <button
          onClick={addVideo}
          className="px-4 py-2 w-[170px] bg-blue-600 hover:bg-blue-800 text-white rounded-md"
        >
          Agregar video
        </button>
        {showNextButton && (
          <button
            onClick={nextStep}
            className="px-4 py-2 w-[150px] bg-indigo-500 hover:bg-indigo-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-outline"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};
