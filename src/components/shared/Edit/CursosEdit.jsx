import React, { useEffect, useState } from 'react'
import { StepOne } from '../StepForm/StepOne'
import { StepTwo } from '../StepForm/StepTwo'
import { StepTwoEdit } from './StepTwoEdit';
import { DropdownButton } from './DropdownButton';
import { ConfirmationDialog } from '../ConfirmationDialog'
import {callApiCursos, updateCurso, addVideoToCurso} from '../../../services/peticionesVideo'

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

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    updateCurso(formData.idCurso, formData);
    setOpen(false);
  };

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
            onClick={handleOpen}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Actualizar
          </button>
          <ConfirmationDialog
            open={open}
            onClose={handleClose}
            title="Actualizar"
            message="¿Estás seguro de que deseas actualizar este curso?"
            onConfirm={handleConfirm} />

        </div>
      </div>



    </>

  )
}


