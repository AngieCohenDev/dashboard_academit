import React, { useState } from 'react';

export const StepTwo = ({ handleAddVideo, showPrevButton, showNextButton, prevStep, nextStep }) => {
  const [videoData, setVideoData] = useState({
    tituloVideo: '',
    descripcion: '',
    clase: '',
    archivoMiniatura: null,
    archivoVideo: null,
    estatus: ''
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

  const addVideo = () => {
    handleAddVideo(videoData);
    setVideoData({
      tituloVideo: '',
      descripcion: '',
      clase: '',
      archivoMiniatura: null,
      archivoVideo: null,
      estatus: ''
    });
  };

  return (
    <div className="p-7 w-full mx-auto h-3/4 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Agregar Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Nombre del Video</label>
          <input 
            type="text" 
            name="tituloVideo" 
            value={videoData.tituloVideo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <input 
            type="text" 
            name="descripcion" 
            value={videoData.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Clase</label>
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
            type="button"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200"
            onClick={() => alert('Subir Material')}
          >
            Subir Material
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium">Miniatura del Video</label>
          <input 
            type="file" 
            name="archivoMiniatura" 
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Subir Video</label>
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
      <div className="flex justify-end space-x-4">
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
          Agregar Video
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


