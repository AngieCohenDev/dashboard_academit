import React from 'react';

const StepThree = ({ prevStep, formData }) => {
  const { courseName, courseDescription, category, status, level, coverImage, videos } = formData;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Revisión del Curso</h2>
      <div>
        <h3 className="text-lg font-semibold">Información del Curso</h3>
        <p><strong>Nombre del Curso:</strong> {courseName}</p>
        <p><strong>Descripción:</strong> {courseDescription}</p>
        <p><strong>Categoría:</strong> {category}</p>
        <p><strong>Estatus:</strong> {status}</p>
        <p><strong>Nivel:</strong> {level}</p>
        {coverImage && (
          <div>
            <strong>Portada del Curso:</strong>
            <img src={URL.createObjectURL(coverImage)} alt="Portada del curso" className="mt-2 h-32" />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Videos</h3>
        {videos.length > 0 ? (
          <ul className="space-y-2">
            {videos.map((video, index) => (
              <li key={index} className="p-2 border border-gray-300 rounded-md">
                <p><strong>Nombre del Video:</strong> {video.videoName}</p>
                <p><strong>Descripción:</strong> {video.videoDescription}</p>
                <p><strong>Estatus:</strong> {video.status}</p>
                {video.thumbnail && (
                  <div>
                    <strong>Miniatura:</strong>
                    <img src={URL.createObjectURL(video.thumbnail)} alt="Miniatura del video" className="mt-2 h-16" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se han agregado videos.</p>
        )}
      </div>
      <div className="flex justify-between">
        <button 
          onClick={prevStep}
          className="px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Anterior
        </button>
        <button 
          onClick={() => alert('Curso creado exitosamente!')}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Confirmar y Crear Curso
        </button>
      </div>
    </div>
  );
};

export default StepThree;
