import React from 'react';

const StepThree = ({ prevStep, formData, onSubmit }) => {

  const { curso, coverImage, videos } = formData;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Revisión del Curso</h2>
      <div>
        <h3 className="text-lg font-semibold">Información del Curso</h3>
        {curso.length > 0 ? (
          <ul className="space-y-2">
            {curso.map((curso, index) => (
              <li key={index} className="p-2 border border-gray-300 rounded-md">
                <p><strong>Nombre del Curso:</strong> {curso.nombreCurso}</p>
                <p><strong>Descripción:</strong> {curso.descripcionCurso}</p>
                <p><strong>Categoría:</strong> {curso.categoria}</p>
                <p><strong>Estatus:</strong> {curso.estatus}</p>
                <p><strong>Nivel:</strong> {curso.nivel}</p>
                {coverImage && (
                  <div>
                    <strong>Portada del Curso:</strong>
                    <img src={URL.createObjectURL(coverImage)} alt="Portada del curso" className="mt-2 h-32" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se agrego curso.</p>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Videos</h3>
        {videos.length > 0 ? (
          <ul className="space-y-2">
            {videos.map((video, index) => (
              <li key={index} className="p-2 border border-gray-300 rounded-md">
                <p><strong>Nombre del Video:</strong> {video.tituloVideo}</p>
                <p><strong>Descripción:</strong> {video.videoDescription}</p>
                <p><strong>Estatus:</strong> {video.estatus}</p>
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
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Confirmar y Crear Curso
        </button>
      </div>
    </div>
  );
};

export default StepThree;
