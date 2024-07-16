import React, { useEffect } from 'react';

const StepThree = ({ prevStep, formData }) => {
  const { nombreCurso, descripcionCurso, categoria, estatus, nivel, fotografiaDelCurso, videos } = formData;

  const createItemVideos = async (formValues) => {

    console.log(formValues);

    const myCursos = new Headers();

    const formData = new FormData()
    formData.append("nombreCurso", formValues['nombreCurso']);
    formData.append("descripcionCurso", formValues['descripcionCurso']);
    formData.append("estatus", formValues['estatus']);
    formData.append("nivel", formValues['nivel']);
    formData.append("fotografiaDelCurso", formValues['fotografiaDelCurso']);
    formData.append("categoria", formValues['categoria']);
    formValues.videos.forEach((video, idx) => {
      for (let key in video) {
        if (typeof video[key] === 'object' && video[key] !== null && !(video[key] instanceof File)) {
          for (let subKey in video[key]) {
            formData.append(`videos[${idx}][${subKey}]`, video[key][subKey]);
          }
        } else {
          formData.append(`videos[${idx}][${key}]`, video[key]);
        }
      }
    })

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const requestOptions = {
      method: "POST",
      headers: myCursos,
      body: formData,
      redirect: "follow"
    };

    const datos = await fetch("http://localhost:8080/cursos", requestOptions);

    console.log(datos);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Revisión del Curso</h2>
      <div>
        <h3 className="text-lg font-semibold">Información del Curso</h3>
        <p><strong>Nombre del Curso:</strong> {nombreCurso}</p>
        <p><strong>Descripción:</strong> {descripcionCurso}</p>
        <p><strong>Categoría:</strong> {categoria}</p>
        <p><strong>Estatus:</strong> {estatus}</p>
        <p><strong>Nivel:</strong> {nivel}</p>
        {fotografiaDelCurso && (
          <div>
            <strong>Portada del Curso:</strong>
            <img src={URL.createObjectURL(fotografiaDelCurso)} alt="Portada del curso" className="mt-2 h-32" />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Videos</h3>
        {videos.length > 0 ? (
          <ul className="space-y-2">
            {videos.map((video, index) => (
              <li key={index} className="p-2 border border-gray-300 rounded-md">
                <p><strong>Nombre del Video:</strong> {video.tituloVideo}</p>
                <p><strong>Descripción:</strong> {video.descripcion}</p>
                <p><strong>Estatus:</strong> {video.estatus}</p>
                {video.archivoMiniatura && (
                  <div>
                    <strong>Miniatura:</strong>
                    <img src={URL.createObjectURL(video.archivoMiniatura)} alt="Miniatura del video" className="mt-2 h-16" />
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
          onClick={() => createItemVideos(formData)}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Confirmar y Crear Curso
        </button>
      </div>
    </div>
  );
};

export default StepThree;
