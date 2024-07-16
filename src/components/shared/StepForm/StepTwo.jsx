import React, { useState } from 'react';

const StepTwo = ({ nextStep, prevStep, handleAddVideo }) => {
  const [videoData, setVideoData] = useState({
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
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Agregar Video</h2>
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
      <div className="flex justify-between">
        <button 
          onClick={prevStep}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Anterior
        </button>
        <button 
          onClick={addVideo}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Agregar Video
        </button>
        <button 
          onClick={nextStep}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
