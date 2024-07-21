import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { StepOne } from '../StepForm/StepOne'
import { StepTwo } from '../StepForm/StepTwo'
import { StepTwoEdit } from './StepTwoEdit';
import { DropdownButton } from './DropdownButton';



const fields = [
  { type: 'text', name: 'nombreCurso', label: 'Nombre del Curso' },
  { type: 'text', name: 'descripcionCurso', label: 'Descripción' },
  {
    type: 'select', name: 'categoria', label: 'Categoría', options: [
      { value: 'programming', label: 'Programación' },
      { value: 'design', label: 'Diseño' },
      { value: 'marketing', label: 'Marketing' }
    ]
  },
  {
    type: 'select', name: 'estatus', label: 'Estatus', options: [
      { value: true, label: 'Activo' },
      { value: false, label: 'Inactivo' }
    ]
  },
  {
    type: 'select', name: 'nivel', label: 'Nivel', options: [
      { value: '', label: 'Seleccionar' },
      { value: 'principiante', label: 'Principiante' },
      { value: 'medio', label: 'Intermedio' },
      { value: 'avanzado', label: 'Avanzado' }
    ]
  },
  { type: 'file', name: 'rutaFotografiaCurso', label: 'Portada del Curso' }
];


export const CursosEdit = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    videos: []
  });

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const callApiCursos = async (id = 1) => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/cursos/${id}`,
      headers: {
        Accept: 'application/json',
      },
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      return {
        type: 'unsucces',
        message: error.response.data.message
      }
    }
  };

  const updateCurso = async (idCurso, formValues) => {

    console.log(idCurso, formValues);

    const myCursos = new Headers();

    const formData = new FormData();

    // Añadir los valores del formulario directamente
    formData.append("nombreCurso", formValues['nombreCurso']);
    formData.append("descripcionCurso", formValues['descripcionCurso']);
    formData.append("estatus", formValues['estatus']);
    formData.append("nivel", formValues['nivel']);
    formData.append("fotografiaDelCurso", formValues['rutaFotografiaCurso']);
    formData.append("categoria", formValues['categoria']);

    // Procesar los videos
    formValues.videos.forEach((video, idx) => {
      for (let key in video) {
        if (typeof video[key] === 'object' && video[key] !== null && !(video[key] instanceof File)) {
          for (let subKey in video[key]) {
            formData.append(`videos[${idx}][${subKey}]`, video[key][subKey]);
          }
        } else {
          if (key === 'rutaMiniatura') {
            formData.append(`videos[${idx}][archivoMiniatura]`, video[key]);
          } else if (key === 'rutaVideo') {
            formData.append(`videos[${idx}][archivoVideo]`, video[key]);
          } else {
            formData.append(`videos[${idx}][${key}]`, video[key]);
          }
        }
      }
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const requestOptions = {
      method: "PATCH",
      headers: myCursos,
      body: formData,
      redirect: "follow"
    };

    const datos = await fetch(`http://localhost:8080/cursos/${idCurso}`, requestOptions);

    console.log(datos);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApiCursos();
        setFormData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isPopupOpen])

  const videos = formData.videos.map((video) => (
    {
      id: video.idVideo,
      title: video.tituloVideo,
      fields: [
        { label: 'Titulo', name: 'tituloVideo', type: 'text' },
        { label: 'Descripcion', name: 'descripcion', type: 'text' },
        { label: 'Clase', name: 'clase', type: 'number' },
        { label: 'Estatus', name: 'estatus', type: 'select', options: [{ value: true, label: 'Activo' }, { value: false, label: 'Inactivo' }] },
        { label: 'Video', name: 'rutaVideo', type: 'file' },
        { label: 'Miniatura', name: 'rutaMiniatura', type: 'file' },
        { label: 'Material', name: 'button', type: 'button' }
      ],
      tituloVideo: video.tituloVideo,
      descripcion: video.descripcion,
      clase: video.clase,
      estatus: video.estatus
    })
  );

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const addVideoToCurso = async (formValues) => {

    const myCursos = new Headers();

    const formData = new FormData();
    // Añadir los valores del formulario directamente
    formData.append("tituloVideo", formValues['tituloVideo']);
    formData.append("clase", formValues['clase']);
    formData.append("archivoVideo", formValues['archivoVideo']);
    formData.append("estatus", formValues['estatus']);
    formData.append("descripcion", formValues['descripcion']);
    formData.append("archivoMiniatura", formValues['archivoMiniatura']);
    formData.append("idCurso", formValues['idCurso']);

    // Procesar los videos
    formValues.materiales?.forEach((material, idx) => {
      for (let key in material) {
        formData.append(`materiales[${idx}][${key}]`, material[key]);
      }
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const requestOptions = {
      method: "POST",
      headers: myCursos,
      body: formData,
      redirect: "follow"
    };

    const datos = await fetch(`http://localhost:8080/videos`, requestOptions);

    console.log(datos);
  };

  const handleAddVideo = (video) => {
    const videoToSave = {
      ...video,
      idCurso: formData.idCurso
    }
    addVideoToCurso(videoToSave);
    closePopup();
  };

  const handleUpdateVideo = (videoId, updatedVideo) => {
    console.log(updatedVideo)
    setFormData({
      ...formData,
      videos: formData.videos.map(video => {
        if (video.idVideo === videoId) {
          // Solo actualizar los campos que ya existen en el video original
          const updatedFields = Object.keys(video).reduce((acc, key) => {
            if (key in updatedVideo) {
              acc[key] = updatedVideo[key];
            }
            return acc;
          }, {});
          return { ...video, ...updatedFields };
        }
        return video;
      })
    });
  }

  return (

    <>
      <div className='bg-white shadow-md rounded-lg  '>
        <StepOne title='Editar curso' fields={fields} nextStep={nextStep} handleChange={handleChange} handleFileChange={handleFileChange} formData={formData} showButton={false} />

        <div className='flex justify-end px-8'>
          <button
            onClick={openPopup}
            className=" px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600"
          >
            Agregar Video
          </button>
          <DropdownButton isOpen={isPopupOpen} onClose={closePopup} showCloseButton={true}>
            <StepTwo handleAddVideo={handleAddVideo} showPrevButton={false} showNextButton={false} />
          </DropdownButton>
        </div>
        <StepTwoEdit
          videos={videos}
          handleUpdateVideo={handleUpdateVideo}
          prevStep={() => console.log('Anterior')}
          nextStep={() => console.log('Siguiente')} />

        <div className='flex justify-end p-4'>
          <button
            onClick={() => updateCurso(formData.idCurso, formData)}
            className="px-4 py-2 bg-green-600 text-white rounded-md "
          >
            Confirmar y Crear Curso
          </button>
        </div>
      </div>



    </>

  )
}


